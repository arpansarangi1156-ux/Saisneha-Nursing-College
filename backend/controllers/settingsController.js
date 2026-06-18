import Settings from '../models/Settings.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    
    // If no settings document exists yet, create a default one
    if (!settings) {
      settings = await Settings.create({});
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create({});
    }

    const {
      address,
      mainPhone,
      admissionsPhone,
      infoEmail,
      admissionsEmail,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      linkedinUrl,
      homeHeroSubtitle,
      googleMapsIframe
    } = req.body;

    settings.address = address || settings.address;
    settings.mainPhone = mainPhone || settings.mainPhone;
    settings.admissionsPhone = admissionsPhone || settings.admissionsPhone;
    settings.infoEmail = infoEmail || settings.infoEmail;
    settings.admissionsEmail = admissionsEmail || settings.admissionsEmail;
    settings.facebookUrl = facebookUrl || settings.facebookUrl;
    settings.twitterUrl = twitterUrl || settings.twitterUrl;
    settings.instagramUrl = instagramUrl || settings.instagramUrl;
    settings.linkedinUrl = linkedinUrl || settings.linkedinUrl;
    settings.homeHeroSubtitle = homeHeroSubtitle || settings.homeHeroSubtitle;
    settings.googleMapsIframe = googleMapsIframe || settings.googleMapsIframe;

    // Handle Image Uploads
    if (req.files) {
      if (req.files.homeHeroImage && req.files.homeHeroImage.length > 0) {
        const result = await cloudinary.uploader.upload(req.files.homeHeroImage[0].path, { folder: 'saisneha_settings' });
        settings.homeHeroImage = result.secure_url;
        fs.unlinkSync(req.files.homeHeroImage[0].path);
      }
      
      if (req.files.aboutCampusImage && req.files.aboutCampusImage.length > 0) {
        const result = await cloudinary.uploader.upload(req.files.aboutCampusImage[0].path, { folder: 'saisneha_settings' });
        settings.aboutCampusImage = result.secure_url;
        fs.unlinkSync(req.files.aboutCampusImage[0].path);
      }
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
