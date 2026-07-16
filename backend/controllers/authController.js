import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

const allowedAdmins = [
  "admin@saisneha.edu",
  "kkmishrasai@gmail.com",
  "arpansarangi1156@gmail.com" // Update with real email
];

export const authAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!allowedAdmins.includes(email)) {
      return res.status(403).json({ message: 'Access Denied: Email not authorized.' });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!allowedAdmins.includes(email)) {
      return res.status(403).json({ message: 'Access Denied: Email not authorized.' });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ email, password });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    if (admin.role === 'superadmin') {
      return res.status(400).json({ message: 'Cannot delete a superadmin' });
    }
    await admin.deleteOne();
    res.json({ message: 'Admin removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
