import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';
dotenv.config();

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const adminExists = await Admin.findOne({ email: 'admin@saisneha.edu' });
    if (adminExists) {
      if (adminExists.role !== 'superadmin') {
        adminExists.role = 'superadmin';
        await adminExists.save();
        console.log('Existing admin upgraded to superadmin.');
      } else {
        console.log('Admin already exists. Credentials: admin@saisneha.edu / adminPassword123!');
      }
      process.exit(0);
    }

    await Admin.create({
      email: 'admin@saisneha.edu',
      password: 'adminPassword123!',
      role: 'superadmin',
    });

    console.log('Default admin created: admin@saisneha.edu / adminPassword123!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createDefaultAdmin();
