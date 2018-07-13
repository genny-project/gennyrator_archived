/* Include dependencies */
import { APIError } from 'lib/errors';

/* Throws an API error for any of fields that are undefined or null */
export default ( fields, min, max ) => {
  /* Loop through all of the fields */
  Object.keys( fields ).forEach( field => {
    /* Get the value of the field */
    const value = fields[field];

    if ( min != null && value < min ) {
      throw new APIError( 400, `'${field}' must be greater than or equal to ${min}` );
    }

    if ( max != null && value > max ) {
      throw new APIError( 400, `'${field}' must be less than or equal to ${max}` );
    }
  });
};
