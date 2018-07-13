/* Include dependencies */
import Database from 'lib/database';
import { UserSchema } from 'schemas';

/* Define and export the model */
const User = Database.model( 'User', UserSchema );
export default User;
