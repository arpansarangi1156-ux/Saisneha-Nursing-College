import Gallery from '../models/Gallery.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Upload new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const uploadImage = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload to cloudinary with automatic optimization
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'saisneha_gallery',
      transformation: [
        { width: 1200, crop: "limit", fetch_format: "auto", quality: "auto" }
      ]
    });

    const newImage = new Gallery({
      title,
      category,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const createdImage = await newImage.save();

    // Remove local file
    fs.unlinkSync(req.file.path);

    res.status(201).json(createdImage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateImage = async (req, res) => {
  try {
    const { title, category } = req.body;
    const image = await Gallery.findById(req.params.id);

    if (image) {
      if (title) image.title = title;
      if (category) image.category = category;

      if (req.file) {
        // Delete old image
        if (image.cloudinaryId) {
          await cloudinary.uploader.destroy(image.cloudinaryId);
        }
        
        // Upload new to cloudinary with automatic optimization
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'saisneha_gallery',
          transformation: [
            { width: 1200, crop: "limit", fetch_format: "auto", quality: "auto" }
          ]
        });
        
        image.imageUrl = result.secure_url;
        image.cloudinaryId = result.public_id;
        fs.unlinkSync(req.file.path);
      }

      const updatedImage = await image.save();
      res.json(updatedImage);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (image) {
      // Delete from cloudinary
      await cloudinary.uploader.destroy(image.cloudinaryId);
      // Delete from db
      await image.deleteOne();
      res.json({ message: 'Image removed' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
