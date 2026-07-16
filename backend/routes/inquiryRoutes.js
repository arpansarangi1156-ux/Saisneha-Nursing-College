import express from 'express';
import rateLimit from 'express-rate-limit';
import { submitInquiry, getInquiries, updateStatus, deleteInquiry } from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 inquiries per hour
  message: { message: 'Too many inquiries sent from this IP, please try again after an hour.' }
});

router.route('/')
  .get(protect, getInquiries)
  .post(inquiryLimiter, submitInquiry);

router.route('/:id/status')
  .put(protect, updateStatus);

router.route('/:id')
  .delete(protect, deleteInquiry);

export default router;
