/* Include dependencies */
import { Factory } from 'factories';
import { requireFields } from 'utils/validation';

/* Returns the object with the specified ID */
export default model => async ( req, res ) => {
  /* Get the path parameters */
  let { id } = req.params;

  /* If the field is missing throw an error */
  requireFields({ id });

  /* Create a factory */
  const factory = new Factory( model );

  /* Get the object */
  const object = await factory.getByID( id );

  /* Returns the object */
  res.json( object );
};
