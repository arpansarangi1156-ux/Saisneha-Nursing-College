import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import axios from 'axios';
import { Award, BookOpen, Clock, UserSquare2 } from 'lucide-react';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await axios.get('/api/faculty');
        if (Array.isArray(data)) {
          setFaculty(data);
        }
      } catch (error) {
        console.error('Error fetching faculty', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // Fallback data if DB is empty
  const defaultFaculty = [
    {
      _id: '1',
      name: 'Dr. Sarah Jenkins',
      qualification: 'Ph.D. in Nursing, M.Sc. Nursing',
      specialization: 'Medical-Surgical Nursing',
      experience: '15 Years',
      imageUrl: null, // Will render placeholder
    },
    {
      _id: '2',
      name: 'Mr. David Chen',
      qualification: 'M.Sc. Nursing, B.Sc. Nursing',
      specialization: 'Community Health Nursing',
      experience: '8 Years',
      imageUrl: null,
    },
    {
      _id: '3',
      name: 'Ms. Priya Sharma',
      qualification: 'M.Sc. Nursing',
      specialization: 'Pediatric Nursing',
      experience: '10 Years',
      imageUrl: null,
    }
  ];

  const displayFaculty = faculty.length > 0 ? faculty : defaultFaculty;

  return (
    <>
      <SEO 
        title="Our Faculty" 
        description="Meet our distinguished faculty members dedicated to your success in nursing." 
      />

      {/* Page Header */}
      <div className="bg-[var(--color-medical-blue)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Distinguished Faculty</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Learn from experienced educators and clinical experts dedicated to your success.
          </p>
        </div>
      </div>

      {/* Faculty Grid */}
      <section className="py-20 bg-[var(--color-light-gray)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-medical-blue)]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayFaculty.map((member) => (
                <div key={member._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                  <div className="h-64 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                    {member.imageUrl ? (
                      <img 
                        src={optimizeCloudinaryUrl(member.imageUrl, 400, 400)} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-50 flex items-center justify-center text-gray-400">
                        <UserSquare2 size={80} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start">
                        <Award className="text-[var(--color-medical-blue)] mr-3 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Qualification</p>
                          <p className="text-gray-800">{member.qualification}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <BookOpen className="text-[var(--color-soft-green)] mr-3 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Specialization</p>
                          <p className="text-gray-800">{member.specialization}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="text-gray-500 mr-3 mt-1 shrink-0" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Experience</p>
                          <p className="text-gray-800">{member.experience}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Faculty;
