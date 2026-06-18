import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true },
  careerOpportunities: { type: String, required: true },
}, { timestamps: true });

courseSchema.index({ title: 1 });

const Course = mongoose.model('Course', courseSchema);
export default Course;
