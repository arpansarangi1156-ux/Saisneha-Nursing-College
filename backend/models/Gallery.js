import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Events', 'Campus', 'Facilities'],
    required: true 
  },
  imageUrl: { type: String, required: true }, // Cloudinary URL
  cloudinaryId: { type: String, required: true }, // For deletion
}, { timestamps: true });

gallerySchema.index({ category: 1 });
gallerySchema.index({ createdAt: -1 });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
