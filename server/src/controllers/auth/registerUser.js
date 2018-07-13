/* Include dependencies */
import { APIError } from 'lib/errors';
import { YOU_ARE_ALREADY_REGISTERED_ERROR, USER_EMAIL_CONFLICT_ERROR } from 'constants';
import { requireFields, requireValidUserType, requireValidEmailAddress } from 'utils/validation';
import { requireUserType } from 'utils/auth';
import { UserType } from 'schemas';
import { UserFactory } from 'factories';
import { User } from 'models';

export default async ( req, res ) => {
  /* Get all of the provided fields */
  const { email, type = UserType.USER } = req.body;

  /**
   * If the user is already logged in and then aren't an admin
   * don't allow them to create another account.
   */
  if ( req.user && req.user.type !== UserType.ADMIN ) {
    throw new APIError( 400, YOU_ARE_ALREADY_REGISTERED_ERROR );
  }

  /* Check that all the fields were provided */
  requireFields({ email });

  /* Check that the email address provided is valid */
  requireValidEmailAddress( email );

  /* If the type is anything other than USER then require admin access */
  if ( type !== UserType.USER ) {
    requireUserType( req.user, UserType.ADMIN );
  }

  /* Check that the user type is a valid one */
  requireValidUserType( type );

  let userAlreadyExists = false;

  /* Check that the user doesn't already exist */
  try {
    await UserFactory.getUserByEmail( email );
    userAlreadyExists = true;
  } catch ( e ) {
    /* Do nothing */
  }

  /* If the user already exists throw an error */
  if ( userAlreadyExists ) {
    throw new APIError( 409, USER_EMAIL_CONFLICT_ERROR );
  }

  /* The user doesn't exist. We can create a new one */
  const user = new User({ email, type });

  /* Save the user in the database */
  await user.save();

  /* Create a new authentication token for the user */
  const token = user.generateToken();

  /* Return the new user */
  res.json({
    user: user.toJSON(),
    token,
  });
};
