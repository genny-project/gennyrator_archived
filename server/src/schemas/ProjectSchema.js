/* Include dependencies */
import Database from 'lib/database';

/* Create the project schema */
const ProjectSchema = new Database.Schema({
  name: { type: String, required: true },
  realm: { type: String, required: true },
  logo: { type: String },
  brandColour: { type: String },
  producerName: { type: String, required: true },
  consumerName: { type: String, required: true },
}, {
  timestamps: true,
});

export default ProjectSchema;
