/* Include dependencies */
import { DEFAULT_ERROR_MESSAGE } from 'constants';
import { APIError } from 'lib/errors';

/* Throws a test error with the error code provided */
export default req => {
  throw new APIError( req.params.code, DEFAULT_ERROR_MESSAGE );
};
