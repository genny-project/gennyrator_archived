/* Include dependencies */
import Database from 'lib/database';
import { ProjectSchema } from 'schemas';

/* Define and export the model */
const Project = Database.model( 'Project', ProjectSchema );
export default Project;
