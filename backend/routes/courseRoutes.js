import express from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, createCourse);

router.route('/:id')
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

export default router;
