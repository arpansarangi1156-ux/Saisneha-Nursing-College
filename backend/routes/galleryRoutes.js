import express from 'express';
import { getGalleryImages, uploadImage, updateImage, deleteImage } from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getGalleryImages)
  .post(protect, upload.single('image'), uploadImage);

router.route('/:id')
  .put(protect, upload.single('image'), updateImage)
  .delete(protect, deleteImage);

export default router;
