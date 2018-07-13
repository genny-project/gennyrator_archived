/* Include dependencies */
import { ProjectFactory } from 'factories';
import { requireFields } from 'utils/validation';

/* Returns the Project with the specified ID */
export default async ( req, res ) => {
  /* Get the path parameters */
  let { id } = req.params;

  /* If the field is missing throw an error */
  requireFields({ id });

  /* Get the project */
  const Project = await ProjectFactory.getByID( id );

  /* Returns the project */
  res.json( Project );
};
