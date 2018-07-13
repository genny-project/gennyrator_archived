/* Include dependencies */
import { ProjectFactory } from 'factories';
import { requireFields, withinRange } from 'utils/validation';
import { PAGINATION_MAX_PROJECTS_LIMIT } from 'constants';

/* Returns an array of all the projects (pagination) */
export default async ( req, res ) => {
  /* Get the pagination parameters */
  let { skip, limit, ...restQuery } = req.query;

  /* If either of the fields are missing throw an error */
  requireFields({ skip, limit });

  /* Convert to numbers */
  skip = parseInt( skip, 10 );
  limit = parseInt( limit, 10 );

  /* Ensure skip and limit are valid values */
  withinRange({ skip }, 0 );
  withinRange({ limit }, 0, PAGINATION_MAX_PROJECTS_LIMIT );

  /* Get the paginated projects */
  const projects = await ProjectFactory.find( restQuery, skip, limit );

  /* Get a count of all the projects */
  const count = await ProjectFactory.getFindCount( restQuery );

  /* Returns the paginated projects and the count of all projects */
  res.json({ projects, count, skip, limit });
};
