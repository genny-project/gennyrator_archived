/* Include dependencies */
import { UserFactory } from 'factories';
import { requireFields } from 'utils/validation';

/* Returns the user with the specified ID */
export default async ( req, res ) => {
  /* Get the path parameters */
  let { id } = req.params;

  /* If the field is missing throw an error */
  requireFields({ id });

  /* Get the user */
  const user = await UserFactory.getUserByID( id );

  /* Returns the user */
  res.json( user );
};
