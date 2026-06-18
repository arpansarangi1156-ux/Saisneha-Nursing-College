import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  // Contact Info
  address: { type: String, default: '' },
  mainPhone: { type: String, default: '' },
  admissionsPhone: { type: String, default: '' },
  infoEmail: { type: String, default: '' },
  admissionsEmail: { type: String, default: '' },
  
  // Social Links
  facebookUrl: { type: String, default: '' },
  twitterUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },

  // Site Meta
  homeHeroSubtitle: { type: String, default: 'Preparing Compassionate Healthcare Professionals for Tomorrow' },
  homeHeroImage: { type: String, default: '' },
  aboutCampusImage: { type: String, default: '' },
  googleMapsIframe: { type: String, default: '' },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
