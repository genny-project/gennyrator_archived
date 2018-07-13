/* Include dependencies */
import isEmail from 'isemail';
import { APIError } from 'lib/errors';
import { INVALID_EMAIL_ADDRESS_ERROR } from 'constants';

export default email => {
  if ( !isEmail.validate( email )) {
    throw new APIError( 400, INVALID_EMAIL_ADDRESS_ERROR );
  }
};
