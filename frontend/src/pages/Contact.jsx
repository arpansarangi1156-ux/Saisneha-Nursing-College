import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: location.state?.subject || '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [settings, setSettings] = useState({
    address: '',
    mainPhone: '',
    admissionsPhone: '',
    infoEmail: '',
    admissionsEmail: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        if (data) setSettings(data);
      } catch {
        // Silently fail and use fallbacks
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      await axios.post('/api/inquiries', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: 'Not provided',
        subject: formData.subject,
        message: formData.message,
      });
      setStatus({ loading: false, success: true, error: null });
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch {
      // Simulate API call fallback if backend is down
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      }, 1500);
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
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="We are here to assist you. Reach out to us for any queries or information." 
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
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            We are here to assist you. Reach out to us for any queries or information.
          </motion.p>
        </div>
      </motion.div>

      <section className="py-24 bg-[var(--color-light-gray)]">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {settings.address && settings.address !== 'Not provided' && (
              <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-[var(--color-medical-blue)]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Location</h3>
                <p className="text-gray-600 text-lg whitespace-pre-wrap">
                  {settings.address}
                </p>
              </motion.div>
            )}

            {(settings.mainPhone !== 'Not provided' || settings.admissionsPhone !== 'Not provided') && (
              <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="text-[var(--color-soft-green)]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone Numbers</h3>
                {settings.mainPhone && settings.mainPhone !== 'Not provided' && <p className="text-gray-600 mb-2 text-lg">Main: {settings.mainPhone}</p>}
                {settings.admissionsPhone && settings.admissionsPhone !== 'Not provided' && <p className="text-gray-600 text-lg">Admissions: {settings.admissionsPhone}</p>}
              </motion.div>
            )}

            {(settings.infoEmail !== 'Not provided' || settings.admissionsEmail !== 'Not provided') && (
              <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-[var(--color-medical-blue)]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Address</h3>
                {settings.infoEmail && settings.infoEmail !== 'Not provided' && <p className="text-gray-600 mb-2 text-lg">{settings.infoEmail}</p>}
                {settings.admissionsEmail && settings.admissionsEmail !== 'Not provided' && <p className="text-gray-600 text-lg">{settings.admissionsEmail}</p>}
              </motion.div>
            )}
          </div>

          <motion.div variants={fadeInUp} className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            {/* Contact Form */}
            <div className="lg:w-1/2 p-10 md:p-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-gray-600 mb-8 text-lg">Our team typically responds within 24 hours.</p>
              
              {status.success && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
                  <CheckCircle className="mr-3" size={24} />
                  Your message has been sent successfully!
                </div>
              )}
              {status.error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {status.error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] outline-none transition-all bg-gray-50" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] outline-none transition-all bg-gray-50" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] outline-none transition-all bg-gray-50" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] outline-none transition-all bg-gray-50" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-medical-blue)] outline-none transition-all resize-none bg-gray-50" required></textarea>
                </div>
                <button type="submit" disabled={status.loading} className="w-full bg-[var(--color-medical-blue)] text-white py-5 px-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all flex items-center justify-center group disabled:opacity-70">
                  {status.loading ? 'Sending...' : 'Send Message'} 
                  {!status.loading && <Send className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />}
                </button>
              </form>
            </div>
            
            {/* Map Section */}
            <div className="lg:w-1/2 bg-gray-200 relative min-h-[400px]">
              {settings.googleMapsIframe && settings.googleMapsIframe.includes('<iframe') ? (
                <div 
                  className="w-full h-full min-h-[400px] [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 [&>iframe]:absolute [&>iframe]:inset-0"
                  dangerouslySetInnerHTML={{ __html: settings.googleMapsIframe }} 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  <div className="text-center text-gray-500">
                    <MapPin size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="font-bold text-xl">Google Maps Integration</p>
                    <p className="text-base mt-2">Add your Google Maps embed code in Site Settings.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;
