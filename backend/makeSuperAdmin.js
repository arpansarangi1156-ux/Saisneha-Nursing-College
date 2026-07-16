import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();

const makeSuperAdmin = async () => {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: node makeSuperAdmin.js <email> <password>');
    process.exit(1);
  }

  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      existingAdmin.role = 'superadmin';
      existingAdmin.password = password; // Will be hashed by pre-save hook
      await existingAdmin.save();
      console.log(`Successfully updated ${email} to be a superadmin and updated their password!`);
    } else {
      await Admin.create({
        email,
        password, // Will be hashed by pre-save hook
        role: 'superadmin'
      });
      console.log(`Successfully created new superadmin account for ${email}!`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
};

makeSuperAdmin();
