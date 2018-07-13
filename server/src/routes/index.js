/* Import dependencies */
import API from 'lib/api';
import { UserType } from 'schemas';
import { User, Project } from 'models';
import {
  getApplicationInformation,
  getApplicationHealth,
  getTestError,
  getMyInformation,
  registerUser,
  authUser,
  findObjects,
  findObjectByID,
} from 'controllers';

class Routes {
  load() {
    /* Load all of the routes */
    API.registerRoute( 'get', '/', getApplicationInformation );
    API.registerRoute( 'get', '/health', getApplicationHealth );
    API.registerRoute( 'get', '/error/:code', getTestError );
    API.registerAuthenticatedRoute( UserType.USER, 'get', '/me', getMyInformation );
    API.registerAuthenticatedRoute( UserType.ADMIN, 'get', '/users', findObjects( User ));
    API.registerAuthenticatedRoute( UserType.ADMIN, 'get', '/users/:id', findObjectByID( User ));
    API.registerRoute( 'post', '/auth/register', registerUser );
    API.registerRoute( 'post', '/auth/login', authUser );

    /* Project routes */
    API.registerAuthenticatedRoute( UserType.USER, 'get', '/projects', findObjects( Project ));
    API.registerAuthenticatedRoute( UserType.USER, 'get', '/projects/:id', findObjectByID( Project ));

    /* Enable the error handler */
    API.enableErrorHandler();
  }
}

export default new Routes();
