import express from 'express';
import { authAdmin, registerAdmin, getAdmins, deleteAdmin } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/register', protect, authorize('superadmin'), registerAdmin);
router.get('/', protect, authorize('superadmin'), getAdmins);
router.delete('/:id', protect, authorize('superadmin'), deleteAdmin);

export default router;
