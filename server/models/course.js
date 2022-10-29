import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
  },
  details: {
    type: String,
  },
  availability: {
    type: String,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
  },
  tutor: {
    type: String,
  },
  tutorname: {
    type: String,
  },
  tutoremail: {
    type: String,
  },
  tutees: {
    type: [String],
    default: [],
  },
  tuteeRequestId: {
    type: String,
  },
  tuteeRequestName: {
    type: String,
  },
  tutors: {
    type: [String],
    default: [],
  },
});

export const Course = mongoose.model('Course', courseSchema);
export const RequestedCourse = mongoose.model('RequestedCourse', courseSchema);

// username: {
//   type: String,
//   required: true,
// }
