import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Contacted', 'Resolved'], 
    default: 'Pending' 
  },
}, { timestamps: true });

contactInquirySchema.index({ createdAt: -1 });
contactInquirySchema.index({ status: 1 });
const ContactInquiry = mongoose.model('ContactInquiry', contactInquirySchema);
export default ContactInquiry;
