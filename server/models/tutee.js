import mongoose from 'mongoose';

const tuteeSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  enrolled: {
    type: [String],
    default: [],
  },
  requested: {
    type: [String],
    default: [],
  },
});

const Tutee = mongoose.model('Tutee', tuteeSchema);
export default Tutee;
