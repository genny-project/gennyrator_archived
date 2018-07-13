/* Include dependencies */
import 'lib/database';
import mongoose from 'mongoose';

export default ( req, res ) => {
  /* If the database is connected then return healthy, otherwise return unhealthy */
  res.status( mongoose.connection.readyState === 1 ? 200 : 503 );
  res.json({
    healthy: mongoose.connection.readyState === 1,
  });
};
