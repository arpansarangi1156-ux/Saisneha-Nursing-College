import express from 'express';
import { 
  getAnnouncements, 
  getAdminAnnouncements,
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAnnouncements)
  .post(protect, createAnnouncement);

router.route('/admin')
  .get(protect, getAdminAnnouncements);

router.route('/:id')
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

export default router;
