/* Include dependencies */
import { Factory } from 'factories';
import { requireFields, withinRange } from 'utils/validation';
import { PAGINATION_MAX_OBJECT_LIMIT } from 'constants';

/* Returns an array of all the projects (pagination) */
export default model => async ( req, res ) => {
  /* Get the pagination parameters */
  let { skip, limit, ...restQuery } = req.query;

  /* If either of the fields are missing throw an error */
  requireFields({ skip, limit });

  /* Convert to numbers */
  skip = parseInt( skip, 10 );
  limit = parseInt( limit, 10 );

  /* Ensure skip and limit are valid values */
  withinRange({ skip }, 0 );
  withinRange({ limit }, 0, PAGINATION_MAX_OBJECT_LIMIT );

  /* Create the factory */
  const factory = new Factory( model );

  /* Get the paginated objects */
  const objects = await factory.find( restQuery, skip, limit );

  /* Get a count of all the objects */
  const count = await factory.getFindCount( restQuery );

  /* Calculate the plural name */
  const pluralName = `${model.modelName.toLowerCase()}s`;

  /* Returns the paginated objects and the count of all objects */
  res.json({ [pluralName]: objects, count, skip, limit });
};
