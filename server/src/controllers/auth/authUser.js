/* Include dependencies */
import { UserFactory } from 'factories';
import { requireFields } from 'utils/validation';

export default async ( req, res ) => {
  /* Get the request parameters */
  const { email, password } = req.body;

  /* Make sure that email and password were provided */
  requireFields({ email, password });

  /* See if a user exists with the email address specified */
  const user = await UserFactory.getUserByEmail( email );

  /* Check that the password provided matches the one stored */
  await user.comparePassword( password );

  /* Generate and return an authentication token */
  const token = user.generateToken();
  res.json({ token, user: user.toJSON() });
};
