/* Include dependencies */
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ErrorHandler from './ErrorHandler';
import Logger from 'lib/logging';
import { userAuthentication } from 'middleware';
import { NOT_AUTHENTICATED_ERROR, ACCESS_DENIED_ERROR } from 'constants';
import { APIError } from 'lib/errors';
import { UserType } from 'schemas';
import requestLogger from 'express-request-logger';

class API {
  /* Sets up the API */
  constructor() {
    /* Create a new express server */
    this.app = express();

    /* Add request logging */
    this.app.use( requestLogger.create( Logger ));

    /* Use JSON body parsing */
    this.app.use( bodyParser.json({ limit: '50mb' }));

    /* Use text body parsing as well (used for base64 uploads) */
    this.app.use( bodyParser.text({ limit: '50mb' }));

    /* Add cors support */
    this.app.use( cors());

    /* Enable the user authentication middleware */
    this.app.use( userAuthentication );

    /* Listen on the defined port */
    this.app.listen( config.api.port, () => {
      Logger.info( `${config.appName} is now listening on ${config.api.port}` );
    });
  }

  /**
   * Starts the error handler. The reason we do this is that the error handler
   * must be defined after all the routes otherwise it won't work correctly.
   */
  enableErrorHandler() {
    /* Create an error handler */
    this.app.use( ErrorHandler );
  }

  /* Registers a route on the API */
  registerRoute( method, path, callback ) {
    this.app[method]( path, ( req, res, next ) => {
      /**
       * We wrap the whole application in a try catch so that we can throw
       * errors from anywhere in the application easily
       */
      try {
        /* Call the route handler and store the result */
        const request = callback( req, res, next );

        /**
         * If the result is defined and we are able to catch an
         * error (async routes) then define the catch handler
         */
        if ( request && request.catch ) {
          request.catch( error => {
            /* Pass the error to the error handler / other middleware */
            return next( error );
          });
        }
      } catch ( error ) {
        /**
         * Any other errors will be caught here, pass them to the
         * error handler / other middleware
         */
        return next( error );
      }
    });
  }

  /* Registers an authenticated route on the API */
  registerAuthenticatedRoute( userTypes, method, path, callback ) {
    this.registerRoute( method, path, async ( req, res, next ) => {
      if ( config.authentication.enabled ) {
        /**
         * If the userTypes object isn't an array make it one. We do this so that
         * we can pass in a single user type without having to wrap it in an
         * array.
         */
        if ( !( userTypes instanceof Array )) {
          userTypes = [ userTypes ];
        }

        /* If the user isn't authenticated at all throw an error */
        if ( !req.user ) {
          throw new APIError( 403, NOT_AUTHENTICATED_ERROR );
        }

        /* Get all of the user types the user inherits */
        const inheritedTypes = UserType.getInheritedTypes( req.user.type );

        /**
         * Loop through the user types and make sure that the user is one of
         * the types provided.
         */
        const hasType = userTypes.find( type => inheritedTypes.indexOf( type ) > -1 ) != null;
        if ( !hasType ) {
          throw new APIError( 403, ACCESS_DENIED_ERROR );
        }
      }

      await callback( req, res, next );
    });
  }
}

export default new API();
