import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Plus, Trash2, Edit, X } from 'lucide-react';

const AdmissionCRUD = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'Guideline',
    isActive: true,
  });

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get('/api/announcements/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(data)) setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      await axios.post('/api/announcements', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      setFormData({ title: '', content: '', type: 'Guideline', isActive: true });
      fetchAnnouncements();
    } catch (error) {
      alert('Error creating record');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`/api/announcements/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAnnouncements();
      } catch (error) {
        alert('Error deleting record');
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`/api/announcements/${id}`, { isActive: !currentStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAnnouncements();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <>
      <Helmet><title>Manage Admissions | Admin</title></Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Admissions & Announcements</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[var(--color-medical-blue)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800"
          >
            <Plus size={20} className="mr-2" /> Add Record
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
              ) : announcements.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4 text-gray-500">No records found.</td></tr>
              ) : (
                announcements.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleStatus(item._id, item.isActive)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900 ml-4">
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
            <h2 className="text-xl font-bold mb-6">Add New Record</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2">
                  <option value="Guideline">Admission Guideline</option>
                  <option value="News">News / Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content / Details</label>
                <textarea name="content" required value={formData.content} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 h-32"></textarea>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInputChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Publish immediately (Active)</label>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[var(--color-medical-blue)] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionCRUD;
