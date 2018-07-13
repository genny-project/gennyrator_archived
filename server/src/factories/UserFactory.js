/* Include dependencies */
import config from 'config';
import { User } from 'models';
import { APIError } from 'lib/errors';
import { USER_NOT_FOUND_ERROR } from 'constants';
import Logger from 'lib/logging';

class UserFactory {
  /* Return a user by email */
  async getUserByEmail( email ) {
    /* Attempt to get the user with the specified email address */
    const user = await User.findOne({ email }).exec();

    /* If the user doesn't exist throw an error */
    if ( !user ) {
      throw new APIError( 404, USER_NOT_FOUND_ERROR );
    }

    return user;
  }

  /* Return a user by ID */
  async getUserByID( id ) {
    /**
     * Attempt to get the user with the specified ID
     * We've wrapped this call in a try catch to catch any errors relating
     * to an invalid ID format. This could probably be done better to only
     * catch that specific error but it'll do for now.
     */
    try {
      const user = await User.findOne({ _id: id }).exec();

      /* If the user doesn't exist throw an error */
      if ( !user ) {
        throw new APIError( 404, USER_NOT_FOUND_ERROR );
      }

      return user;
    } catch ( e ) {
      /**
       * We've caught some other sort of error (most likely invalid ID format)
       * throw an error.
       */
      throw new APIError( 404, USER_NOT_FOUND_ERROR );
    }
  }

  /* Returns the number of users */
  async getUserCount() {
    return await User.count();
  }

  /* Returns an array of all the users */
  async getAllUsers( skip = 0, limit = 10 ) {
    return await User.find({}).skip( skip ).limit( limit ).exec();
  }

  /* Find users */
  async findUsers( query, skip = 0, limit = 10 ) {
    return await User.find( query ).skip( skip ).limit( limit ).exec();
  }

  /* Returns the number of users matching the provided query */
  async getUserFindCount( query ) {
    return await User.find( query ).count();
  }

  /* Create the default users if they don't already exist */
  async createDefaultUsers() {
    /* Get the array of the default users */
    const { defaultUsers } = config;

    /* Loop through the array of default users and create each one */
    defaultUsers.forEach( async user => {
      /* Check whether the user already exists */
      const existing = await User.findOne({ email: user.email }).exec();

      if ( !existing ) {
        /* The user doesn't exist create a new one */
        const newUser = new User( user );
        await newUser.save();

        Logger.info( `Created default user with email ${user.email}` );
      } else {
        Logger.info( `Default user with email ${user.email} already exists` );
      }
    });
  }
}

export default new UserFactory();
