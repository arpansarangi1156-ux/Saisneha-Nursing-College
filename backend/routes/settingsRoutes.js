import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protect, upload.fields([{ name: 'homeHeroImage' }, { name: 'aboutCampusImage' }]), updateSettings);

export default router;
