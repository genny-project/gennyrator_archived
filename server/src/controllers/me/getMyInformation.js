/* Include dependencies */
import { UserFactory } from 'factories';

export default async ( req, res ) => {
  /* Get the full user object of the user who made this request */
  const user = await UserFactory.getUserByID( req.user.id );
  res.json( user.toJSON());
};
