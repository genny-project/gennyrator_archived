/* Include dependencies */
import { APIError } from 'lib/errors';
import { ACCESS_DENIED_ERROR } from 'constants';

export default ( user, type ) => {
  if ( user.type !== type ) {
    throw new APIError( 403, ACCESS_DENIED_ERROR );
  }
};
