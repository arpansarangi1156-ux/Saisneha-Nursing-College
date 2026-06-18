import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Clock, CheckCircle, Briefcase, ChevronRight } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fallback data if DB is empty
  const defaultCourses = [
    {
      _id: '1',
      title: 'B.Sc. Nursing',
      overview: 'A comprehensive undergraduate program that prepares students to become highly competent professional nurses capable of providing high-quality care in various settings.',
      duration: '4 Years',
      eligibility: '10+2 with Science (PCB) & English Core/English Elective with aggregate of 45% marks.',
      careerOpportunities: 'Staff Nurse, Nursing Tutor, Public Health Nurse, Clinical Instructor.',
    },
    {
      _id: '2',
      title: 'General Nursing and Midwifery (GNM)',
      overview: 'A diploma program designed to train general nurses who can effectively assist in providing care to individuals, families, and communities.',
      duration: '3 Years',
      eligibility: '10+2 with English and must have obtained a minimum of 40% at the qualifying examination.',
      careerOpportunities: 'Community Health Nurse, Home Care Nurse, Staff Nurse in Hospitals.',
    }
  ];

  const displayCourses = courses.length > 0 ? courses : defaultCourses;

  return (
    <>
      <SEO 
        title="Courses" 
        description="Explore our academic programs and pathways to your rewarding career in nursing." 
      />

      {/* Page Header */}
      <div className="bg-[var(--color-medical-blue)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the pathways to your rewarding career in nursing.
          </p>
        </div>
      </div>

      {/* Courses List */}
      <section className="py-20 bg-[var(--color-light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-medical-blue)]"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {displayCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-[var(--color-medical-blue)] mb-6">{course.title}</h2>
                    
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {course.overview}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center mb-3">
                          <Clock className="text-[var(--color-medical-blue)] mr-2" size={24} />
                          <h3 className="font-bold text-gray-900">Duration</h3>
                        </div>
                        <p className="text-gray-700">{course.duration}</p>
                      </div>

                      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="text-[var(--color-soft-green)] mr-2" size={24} />
                          <h3 className="font-bold text-gray-900">Eligibility</h3>
                        </div>
                        <p className="text-gray-700">{course.eligibility}</p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center mb-3">
                          <Briefcase className="text-gray-600 mr-2" size={24} />
                          <h3 className="font-bold text-gray-900">Career Paths</h3>
                        </div>
                        <p className="text-gray-700">{course.careerOpportunities}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <RouterLink 
                        to="/contact"
                        state={{ subject: `Information Request: ${course.title}` }}
                        className="inline-flex items-center text-[var(--color-medical-blue)] font-semibold hover:text-[var(--color-medical-blue)] hover:underline transition-all"
                      >
                        Request More Information <ChevronRight className="ml-1" size={20} />
                      </RouterLink>
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

export default Courses;
