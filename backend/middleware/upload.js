import multer from 'multer';
import path from 'path';

// Multer config
export default multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
