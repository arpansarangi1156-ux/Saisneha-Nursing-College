import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  imageUrl: { type: String }, // Cloudinary URL
  cloudinaryId: { type: String }, // For deletion
}, { timestamps: true });

facultySchema.index({ name: 1 });

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
