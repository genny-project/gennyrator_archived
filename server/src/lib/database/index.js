/* Include dependencies */
import config from 'config';
import mongoose from 'mongoose';

/* Connect to the database */
mongoose.connect( config.database.url );

/* Define promise method */
mongoose.Promise = global.Promise;

/* Export the mongoose instance so it can be used easily */
export default mongoose;
