/* Include dependencies */
import { UserFactory } from 'factories';

/* Make sure the job UI starts */
import 'lib/jobs';

/* Start all of the job workers */
import 'lib/jobs/workers';

/* Include all of the routes */
import Routes from 'routes';

/* Run any loading required */
Routes.load();

/* Create any default users */
UserFactory.createDefaultUsers();
