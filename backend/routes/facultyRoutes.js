import express from 'express';
import { getFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getFaculty)
  .post(protect, upload.single('image'), createFaculty);

router.route('/:id')
  .put(protect, upload.single('image'), updateFaculty)
  .delete(protect, deleteFaculty);

export default router;
