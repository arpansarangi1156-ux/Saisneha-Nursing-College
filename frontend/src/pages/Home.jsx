import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, ShieldCheck, BookOpen, Users, Building, Activity, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
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
        title="Home" 
        description="Preparing Compassionate Healthcare Professionals for Tomorrow" 
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-medical-blue)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-48 w-96 h-96 bg-[var(--color-soft-green)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={sentenceVariants} className="text-[var(--color-soft-green)] font-semibold tracking-wider uppercase text-sm mb-4 flex justify-center overflow-hidden">
              {"Welcome to Saisneha College of Nursing and Health Sciences".split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
              Preparing <span className="text-[var(--color-medical-blue)]">Compassionate</span> Healthcare Professionals for Tomorrow
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join a premier institution dedicated to excellence in nursing education. State-of-the-art facilities, expert faculty, and a commitment to your success.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admissions" className="bg-[var(--color-medical-blue)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group">
                Apply Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/courses" className="bg-white text-[var(--color-medical-blue)] border-2 border-[var(--color-medical-blue)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center">
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-24 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-medical-blue)] mb-6">Empowering the Next Generation of Nurses</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                At Saisneha College of Nursing and Health Sciences, we are dedicated to transforming passionate students into highly skilled, compassionate healthcare professionals. 
              </p>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Our curriculum blends rigorous academic theory with intensive clinical practice, ensuring our graduates are ready to meet the complex demands of modern healthcare environments with confidence and empathy.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
                  <HeartPulse className="text-[var(--color-soft-green)] mb-3" size={32} />
                  <div className="text-gray-900 font-bold text-lg mb-1">Compassionate Care</div>
                  <div className="text-sm text-gray-600">We nurture empathy and deep human connection as the core foundation of your nursing practice.</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
                  <Award className="text-[var(--color-soft-green)] mb-3" size={32} />
                  <div className="text-gray-900 font-bold text-lg mb-1">Clinical Excellence</div>
                  <div className="text-sm text-gray-600">Gain unwavering confidence through hands-on mastery in state-of-the-art simulation environments.</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
                  <ShieldCheck className="text-[var(--color-soft-green)] mb-3" size={32} />
                  <div className="text-gray-900 font-bold text-lg mb-1">Ethical Leadership</div>
                  <div className="text-sm text-gray-600">Cultivate the strong moral character and integrity required to advocate for those in your care.</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
                  <Users className="text-[var(--color-soft-green)] mb-3" size={32} />
                  <div className="text-gray-900 font-bold text-lg mb-1">Supportive Community</div>
                  <div className="text-sm text-gray-600">Join a lifelong family of educators and peers who are deeply invested in your personal success.</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-medical-blue)] to-[var(--color-soft-green)] rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img src={settings?.homeHeroImage || "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Nursing Students" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover h-[500px]" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Nursing Section */}
      <section className="py-24 bg-[var(--color-light-gray)]">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-medical-blue)] mb-6">Why Choose Nursing?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl leading-relaxed">Nursing is more than a career; it is a calling. Discover the profound impact you can make on individual lives and global health.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl mb-8">
                <HeartPulse className="text-[var(--color-medical-blue)]" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Make a Real Difference</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Directly impact patient care, saving lives and bringing comfort to those in their most vulnerable moments.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-2xl mb-8">
                <Activity className="text-[var(--color-soft-green)]" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">High Demand</h3>
              <p className="text-gray-600 text-lg leading-relaxed">The healthcare sector is rapidly expanding, offering excellent job security and diverse opportunities worldwide.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl mb-8">
                <ShieldCheck className="text-[var(--color-medical-blue)]" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Respected Profession</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Join one of the most trusted and respected professions globally, characterized by ethical practice and leadership.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Facilities Overview (Abbreviated) */}
      <section className="py-24 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-medical-blue)] mb-6">World-Class Facilities</h2>
              <p className="text-gray-600 text-xl leading-relaxed">We provide an environment that bridges the gap between theoretical knowledge and practical clinical skills.</p>
            </div>
            <Link to="/facilities" className="mt-8 md:mt-0 text-[var(--color-medical-blue)] font-bold text-lg hover:text-[var(--color-medical-blue-light)] flex items-center group">
              View All Facilities <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Modern Library", desc: "Extensive collection of medical literature.", color: "text-[var(--color-soft-green)]" },
              { icon: Users, title: "Nursing Labs", desc: "Advanced simulation mannequins for practice.", color: "text-[var(--color-medical-blue)]" },
              { icon: Activity, title: "Patient Demo Rooms", desc: "Replicating hospital environments.", color: "text-[var(--color-soft-green)]" },
              { icon: Building, title: "Smart Classrooms", desc: "Equipped with the latest teaching aids.", color: "text-[var(--color-medical-blue)]" }
            ].map((facility, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-50">
                <facility.icon className={`${facility.color} mb-6`} size={40} />
                <h3 className="font-bold text-xl mb-3 text-gray-900">{facility.title}</h3>
                <p className="text-gray-600 text-base">{facility.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-medical-blue)] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwbDhfOHptOF8wTDBfOHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==')]"></div>
        <motion.div 
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-8">Begin Your Nursing Journey Today</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-12 leading-relaxed">
            Our admissions team is ready to guide you through the process and answer any questions you may have.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/admissions" className="bg-white text-[var(--color-medical-blue)] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
              Start Application
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all hover:scale-105">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
