/* Include dependencies */
import { APIError } from 'lib/errors';

/* Throws an API error for any of fields that are undefined or null */
export default fields => {
  /* Loop through all of the fields */
  Object.keys( fields ).forEach( field => {
    /* If the field is undefined or an empty string throw an error */
    if ( fields[field] == null || fields[field] == undefined || fields[field] === '' ) {
      throw new APIError( 400, `'${field}' must be provided` );
    }
  });
};
