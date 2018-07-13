/* Include dependencies */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from 'lib/database';
import UserType from './UserType';
import config from 'config';
import { APIError } from 'lib/errors';
import { INVALID_PASSWORD_ERROR } from 'constants';

/* Create the user schema */
const UserSchema = new Database.Schema({
  type: { type: String, required: true }, /* The type of user (admin etc) */
  firstName: { type: String, required: true }, /* The first name of the user */
  lastName: { type: String, required: true }, /* The last name of the user */
  email: { type: String, required: true, unique: true }, /* The email address of the user */
  password: { type: String, required: true }, /* The hash of the password of the user */
  active: { type: Boolean, default: true }, /* Whether or not this user is active */
}, {
  timestamps: true,
});

/**
 * Make sure that password hashes are always removed from responses.
 * Additionally enable virtual field support.
 */
UserSchema.set( 'toJSON', {
  transform: ( doc, ret ) => {
    delete ret.password;
    return ret;
  },
  virtuals: true,
});

/* Create a fullName virtual field which returns the users full name */
UserSchema.virtual( 'fullName' ).get( function() {
  return `${this.firstName} ${this.lastName}`;
});

/* Create a isAdmin virtual field which returns whether or not this user is a admin */
UserSchema.virtual( 'isAdmin' ).get( function() {
  return this.type === UserType.ADMIN;
});

/**
 * Before any user is saved handle password hashing.
 * Note: We have to use the function( arg ) sync here because of the `this`
 * binding. Changing it to the arrow syntax will break this function.
 */
UserSchema.pre( 'save', function( next ) {
  const user = this;

  /* Only hash the password if it has been modified */
  if ( !user.isModified( 'password' )) {
    next();
    return;
  }

  /* Generate a salt for the password */
  bcrypt.genSalt( 10, ( err, salt ) => {
    /* If there was an error return the error */
    if ( err ) {
      next( err );
      return;
    }

    /* Hash the password using the generated salt */
    bcrypt.hash( user.password, salt, ( err, hash ) => {
      /* Replace the plain text password with the hashed one */
      user.password = hash;
      next();
    });
  });
});

/* Create a method to check a password against the stored one */
UserSchema.methods.comparePassword = async function( password ) {
  /* Compare the password against the stored hash */
  const isValid = await bcrypt.compare( password, this.password );

  /* If the password is incorrect throw an error */
  if ( !isValid ) {
    throw new APIError( 400, INVALID_PASSWORD_ERROR );
  }
};

/* Create a method to generate a JWT token for this user */
UserSchema.methods.generateToken = function() {
  /* Define the data that will be inserted into the token */
  const data = {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    fullName: this.fullName,
    type: this.type,
  };

  /* Return the signed token */
  return jwt.sign( data, config.authentication.secret, { expiresIn: '365d' });
};

export default UserSchema;
