import Faculty from '../models/Faculty.js';
import cloudinary from '../config/cloudinary.js';

export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({});
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const { name, qualification, specialization, experience } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'faculty' });
      imageUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    const faculty = new Faculty({ name, qualification, specialization, experience, imageUrl, cloudinaryId });
    const createdFaculty = await faculty.save();
    res.status(201).json(createdFaculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (faculty) {
      if (faculty.cloudinaryId) {
        await cloudinary.uploader.destroy(faculty.cloudinaryId);
      }
      await faculty.deleteOne();
      res.json({ message: 'Faculty removed' });
    } else {
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
