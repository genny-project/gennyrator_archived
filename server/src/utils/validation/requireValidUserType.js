/* Include dependencies */
import { UserType } from 'schemas';
import { APIError } from 'lib/errors';
import { INVALID_USER_TYPE_ERROR } from 'constants';

export default type => {
  /**
   * Check whether the type provided is a valid type. We do this by first
   * filtering out any helper functions from the UserType object and then checking
   * if the type provided exists within that array
   */
  const validType = Object.keys( UserType ).filter( key => typeof UserType[key] === 'string' ).indexOf( type ) > -1;

  if ( !validType ) {
    throw new APIError( 400, INVALID_USER_TYPE_ERROR );
  }
};
