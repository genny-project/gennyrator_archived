/* Include dependencies */
import kue from 'kue';

/* Create the queue */
const q = kue.createQueue({
  redis: {
    //host: 'redis',
  },
});

/* Enable the web UI */
kue.app.listen( 4278 );

/* Export the created queue */
export default q;
