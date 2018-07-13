/* Inclue dependencies */
import jwt from 'jsonwebtoken';
import config from 'config';
import { APIError } from 'lib/errors';
import { INVALID_AUTHENTICATION_TOKEN_ERROR } from 'constants';

export default ( req, res, next ) => {
  /* Check whether a token was provided */
  if ( req.headers.authorization != null && req.headers.authorization !== 'null' && req.headers.authorization !== '' ) {
    try {
      /**
       * A token was provided, let's try and decode it. We'll store the result
       * in an object on the request so it is accessible to all the route
       * controllers. Some tokens will have Bearer at the start so we will
       * strip this before trying to parse.
       */
      req.user = jwt.verify( req.headers.authorization.replace( 'Bearer ', '' ), config.authentication.secret );
    } catch ( err ) {
      throw new APIError( 403, INVALID_AUTHENTICATION_TOKEN_ERROR );
    }
  }

  /* No token was provided, continue processing the request */
  next();
};
