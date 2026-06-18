import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Plus, Trash2, X } from 'lucide-react';

const CourseCRUD = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    duration: '',
    eligibility: '',
    careerOpportunities: '',
  });

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses');
      if (Array.isArray(data)) setCourses(data);
    } catch (error) {
      console.error('Error fetching courses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      await axios.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      setFormData({ title: '', overview: '', duration: '', eligibility: '', careerOpportunities: '' });
      fetchCourses();
    } catch (error) {
      alert('Error creating course');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCourses();
      } catch (error) {
        alert('Error deleting course');
      }
    }
  };

  return (
    <>
      <Helmet><title>Manage Courses | Admin</title></Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[var(--color-medical-blue)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800"
          >
            <Plus size={20} className="mr-2" /> Add Course
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overview</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4 text-gray-500">No courses found.</td></tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{course.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{course.overview}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-900 ml-4">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">Add New Course</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" name="duration" required value={formData.duration} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" placeholder="e.g., 4 Years" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                  <input type="text" name="eligibility" required value={formData.eligibility} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
                  <input type="text" name="careerOpportunities" required value={formData.careerOpportunities} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overview Description</label>
                  <textarea name="overview" required value={formData.overview} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 h-24"></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[var(--color-medical-blue)] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCRUD;
