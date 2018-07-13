/* Include dependencies */
import config from 'config';
import { User } from 'models';
import Factory from './Factory';
import { APIError } from 'lib/errors';
import { USER_NOT_FOUND_ERROR } from 'constants';
import Logger from 'lib/logging';

class UserFactory extends Factory {
  /* Return a user by email */
  async getByEmail( email ) {
    /* Attempt to get the user with the specified email address */
    const user = await User.findOne({ email }).exec();
  
    /* If the user doesn't exist throw an error */
    if ( !user ) {
      throw new APIError( 404, USER_NOT_FOUND_ERROR );
    }
  
    return user;
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

export default new UserFactory( User );
