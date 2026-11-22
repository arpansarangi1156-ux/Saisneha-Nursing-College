import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

// Fallback data if backend is not connected
const FALLBACK_ITEMS = [
  { _id: 1, category: 'Events', title: 'Annual Day 2025' },
  { _id: 2, category: 'Campus', title: 'Main Building' },
  { _id: 3, category: 'Facilities', title: 'Nursing Lab Session' },
  { _id: 4, category: 'Events', title: 'Lamp Lighting Ceremony' },
  { _id: 5, category: 'Campus', title: 'Student Garden' },
  { _id: 6, category: 'Facilities', title: 'Library Study Area' },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get('/api/gallery');
        if (Array.isArray(data) && data.length > 0) {
          setGalleryItems(data);
        } else {
          setGalleryItems(FALLBACK_ITEMS);
        }
      } catch (error) {
        console.error('Error fetching gallery', error);
        setGalleryItems(FALLBACK_ITEMS);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const tabs = ['All', 'Events', 'Campus', 'Facilities'];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <>
      <SEO 
        title="Gallery" 
        description="View glimpses of life, learning, and events at Saisneha College of Nursing and Health Sciences." 
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
            Photo Gallery
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Glimpses of life, learning, and events at Saisneha College of Nursing and Health Sciences.
          </motion.p>
        </div>
      </motion.div>

      <section className="py-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-[var(--color-medical-blue)] text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20 text-gray-500 text-xl font-medium">Loading Gallery...</div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={item._id} 
                    variants={popIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all aspect-video bg-gray-100 flex items-center justify-center cursor-pointer border border-gray-100"
                  >
                    {item.imageUrl ? (
                      <img src={optimizeCloudinaryUrl(item.imageUrl, 800, 600)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <ImageIcon size={48} className="mb-2 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-sm font-medium">Image Placeholder</span>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <div>
                        <span className="text-[var(--color-soft-green)] text-xs font-black uppercase tracking-widest mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredItems.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-500 text-xl">
              <p>No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
