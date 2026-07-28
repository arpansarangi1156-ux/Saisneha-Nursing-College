import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Target, Compass, Award, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const About = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        setSettings(data);
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };
    fetchSettings();
  }, []);
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about Saisneha College of Nursing and Health Sciences, our mission, vision, and leadership." 
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
            About Our College
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Dedicated to academic excellence, clinical competence, and compassionate care.
          </motion.p>
        </div>
      </motion.div>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div variants={fadeInUp} className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-medical-blue)] mb-8">College Overview</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Saisneha College of Nursing and Health Sciences is a newly established, premier institution committed to preparing the next generation of healthcare leaders. Our college is founded on the principles of evidence-based practice, ethical care, and community service.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                With a focus on holistic development, we provide our students with an environment that fosters intellectual growth, critical thinking, and technical proficiency. Although we are new, our dedication to upholding the highest standards of nursing education is unwavering.
              </p>
              <div className="flex items-center space-x-4 text-[var(--color-medical-blue)] font-bold bg-blue-50 p-4 rounded-xl border border-blue-100">
                <Award size={32} className="text-[var(--color-soft-green)]" />
                <span>Committed to Excellence in Healthcare Education</span>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-1/2 w-full">
              {settings?.aboutCampusImage ? (
                <img src={settings.aboutCampusImage} alt="Campus Building" className="rounded-3xl shadow-2xl w-full object-cover h-[500px]" />
              ) : (
                <div className="bg-blue-50 rounded-3xl p-2 h-96 relative overflow-hidden flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-medical-blue)] to-[var(--color-soft-green)] opacity-10"></div>
                  <span className="text-[var(--color-medical-blue)] font-bold text-xl z-10 flex flex-col items-center opacity-50">
                    <Building size={80} className="mb-6" />
                    Campus Building
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-[var(--color-light-gray)]">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp} className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-medical-blue)]"></div>
              <Target className="text-[var(--color-medical-blue)] mb-8" size={56} />
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be a globally recognized center of excellence in nursing education, known for cultivating highly competent, empathetic professionals who drive innovation in healthcare and significantly improve patient outcomes worldwide.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-soft-green)]"></div>
              <Compass className="text-[var(--color-soft-green)] mb-8" size={56} />
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Our Mission</h3>
              <ul className="text-gray-600 space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-[var(--color-soft-green)] mr-3 font-bold">•</span>
                  Provide rigorous, contemporary academic curricula.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-soft-green)] mr-3 font-bold">•</span>
                  Facilitate intensive clinical training in diverse healthcare settings.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-soft-green)] mr-3 font-bold">•</span>
                  Instill strong ethical values and cultural competence.
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-soft-green)] mr-3 font-bold">•</span>
                  Promote research, lifelong learning, and community service.
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Leadership Message */}
      <section className="py-24 bg-white">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-[var(--color-medical-blue)] mb-12">Leadership Message</motion.h2>
          <motion.div variants={fadeInUp} className="bg-blue-50 p-12 rounded-[3rem] relative shadow-inner">
            <div className="text-8xl text-[var(--color-medical-blue)] opacity-10 absolute top-0 left-8">"</div>
            <p className="text-2xl text-gray-700 font-medium leading-relaxed mb-10 relative z-10 italic">
              "Welcome to Saisneha College of Nursing and Health Sciences. Our goal is to empower individuals who have a passion for caring. We are building an institution where rigorous academics meet deep compassion. The future of healthcare relies on dedicated nurses, and we are committed to providing you with the knowledge, skills, and values needed to make a profound difference."
            </p>
            <div className="flex items-center justify-center flex-col">
              <div className="w-16 h-1 bg-[var(--color-soft-green)] rounded-full mb-6"></div>
              <h4 className="text-xl font-bold text-gray-900">Principal's Name</h4>
              <span className="text-base text-gray-500 font-medium uppercase tracking-wider mt-1">Principal, Saisneha College of Nursing and Health Sciences</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
