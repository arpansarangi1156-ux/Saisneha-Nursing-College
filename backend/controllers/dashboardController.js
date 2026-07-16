import Faculty from '../models/Faculty.js';
import Course from '../models/Course.js';
import ContactInquiry from '../models/ContactInquiry.js';
import Gallery from '../models/Gallery.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const [facultyCount, courseCount, inquiryCount, galleryCount, recentInquiries] = await Promise.all([
      Faculty.countDocuments(),
      Course.countDocuments(),
      ContactInquiry.countDocuments(),
      Gallery.countDocuments(),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(9)
    ]);

    res.json({
      counts: {
        faculty: facultyCount,
        courses: courseCount,
        inquiries: inquiryCount,
        gallery: galleryCount
      },
      recentActivity: recentInquiries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch dashboard statistics' });
  }
};
