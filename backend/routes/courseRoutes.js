import express from 'express';
import { getCourses, createCourse, deleteCourse } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, createCourse);

router.route('/:id')
  .delete(protect, deleteCourse);

export default router;
