/* Include dependencies */
import { UserFactory } from 'factories';
import { requireFields, withinRange } from 'utils/validation';
import { PAGINATION_MAX_USERS_LIMIT } from 'constants';

/* Returns an array of all the users (pagination) */
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
  withinRange({ limit }, 0, PAGINATION_MAX_USERS_LIMIT );

  /* Get the paginated users */
  const users = await UserFactory.findUsers( restQuery, skip, limit );

  /* Get a count of all the users */
  const count = await UserFactory.getUserFindCount( restQuery );

  /* Returns the paginated users and the count of all users */
  res.json({ users, count, skip, limit });
};
