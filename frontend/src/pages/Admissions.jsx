import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { FileText, CheckCircle, HelpCircle, Send, CheckCircle2, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get('/api/announcements');
        if (Array.isArray(data)) setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements', error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      await axios.post('/api/inquiries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Admission Inquiry for ${formData.course}`,
        message: formData.message || 'No additional message provided.',
      });
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to submit inquiry. Please try again.' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <>
      <SEO 
        title="Admissions" 
        description="Take the first step towards a rewarding career in nursing. Join our vibrant academic community." 
      />

      {/* Page Header */}
      <motion.div 
        className="bg-[var(--color-medical-blue)] text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Admissions
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Take the first step towards a rewarding career in nursing. Join our vibrant academic community.
          </motion.p>
        </div>
      </motion.div>

      <section className="py-24 bg-[var(--color-light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Admission Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {announcements.length > 0 && (
                <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 border-l-4 border-l-yellow-400">
                  <div className="flex items-center mb-6">
                    <Bell className="text-yellow-500 mr-3" size={32} />
                    <h2 className="text-2xl font-bold text-gray-900">Latest Announcements</h2>
                  </div>
                  <div className="space-y-4">
                    {announcements.map(ann => (
                      <div key={ann._id} className="p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-1">{ann.title}</h3>
                        <p className="text-gray-600 text-sm whitespace-pre-wrap">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 mb-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-8">
                  <CheckCircle className="text-[var(--color-medical-blue)] mr-4" size={36} />
                  <h2 className="text-3xl font-extrabold text-gray-900">Admission Process</h2>
                </div>
                <ol className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                  {[
                    { title: "Submit Inquiry", desc: "Fill out the inquiry form to express your interest." },
                    { title: "Counseling Session", desc: "Our admissions team will contact you to schedule a session and verify eligibility." },
                    { title: "Application Submission", desc: "Submit the formal application along with required documents." },
                    { title: "Confirmation", desc: "Receive your admission letter and complete the fee payment to secure your seat.", active: true }
                  ].map((step, idx) => (
                    <li key={idx} className="ml-8">            
                      <span className={`absolute flex items-center justify-center w-10 h-10 rounded-full -left-[21px] ring-4 ring-white font-bold ${step.active ? 'bg-[var(--color-soft-green)] text-white' : 'bg-blue-50 text-[var(--color-medical-blue)]'}`}>
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-8">
                  <FileText className="text-[var(--color-medical-blue)] mr-4" size={36} />
                  <h2 className="text-3xl font-extrabold text-gray-900">Required Documents</h2>
                </div>
                <ul className="space-y-4 text-gray-600 text-lg">
                  {[
                    "10th and 12th Marksheets & Certificates",
                    "Transfer Certificate (TC)",
                    "Migration Certificate (if applicable)",
                    "Character Certificate",
                    "Aadhar Card Copy",
                    "6 Passport Size Photographs",
                    "Medical Fitness Certificate"
                  ].map((doc, idx) => (
                    <li key={idx} className="flex items-start bg-gray-50 p-3 rounded-xl">
                      <span className="text-[var(--color-soft-green)] mr-3 font-bold">✓</span> {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 sticky top-28">
                <div className="flex items-center mb-6">
                  <HelpCircle className="text-[var(--color-soft-green)] mr-4" size={36} />
                  <h2 className="text-3xl font-extrabold text-gray-900">Admission Inquiry</h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">Fill out this form and our admission counselors will get back to you shortly.</p>
                
                {status.success && (
                  <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
                    <CheckCircle2 className="mr-3" size={24} />
                    Inquiry submitted successfully! We'll be in touch.
                  </div>
                )}
                {status.error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {status.error}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="+1 (555) 000-0000" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Course Interested In</label>
                    <select name="course" value={formData.course} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50" required>
                      <option value="">Select a Course</option>
                      <option value="B.Sc. Nursing">B.Sc. Nursing</option>
                      <option value="GNM">General Nursing and Midwifery (GNM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] focus:border-transparent outline-none transition-all resize-none bg-gray-50" placeholder="Any specific questions?"></textarea>
                  </div>
                  <button type="submit" disabled={status.loading} className="w-full bg-[var(--color-medical-blue)] text-white py-5 px-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all flex items-center justify-center group disabled:opacity-70">
                    {status.loading ? 'Submitting...' : 'Submit Inquiry'} 
                    {!status.loading && <Send className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
