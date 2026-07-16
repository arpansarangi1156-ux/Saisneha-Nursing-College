import ContactInquiry from '../models/ContactInquiry.js';
import nodemailer from 'nodemailer';

// @desc    Submit a new contact inquiry
// @route   POST /api/inquiries
// @access  Public
export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newInquiry = new ContactInquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    const savedInquiry = await newInquiry.save();

    // Send email notification (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Assuming Gmail, configurable via env
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Admission Query: ${subject}`,
        text: `You have received a new inquiry from ${name}.\n\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error('Error sending email:', error);
        else console.log('Email sent:', info.response);
      });
    }

    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private/Admin
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (inquiry) {
      if (['Pending', 'Contacted', 'Resolved'].includes(status)) {
        inquiry.status = status;
        const updatedInquiry = await inquiry.save();
        res.json(updatedInquiry);
      } else {
        res.status(400).json({ message: 'Invalid status' });
      }
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (inquiry) {
      await inquiry.deleteOne();
      res.json({ message: 'Inquiry removed' });
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
