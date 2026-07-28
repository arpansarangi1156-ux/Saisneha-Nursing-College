import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const FacultyCRUD = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    qualification: '',
    department: '',
    experience: '',
    image: null,
  });

  const fetchFaculty = async () => {
    try {
      const { data } = await axios.get('/api/faculty');
      if (Array.isArray(data)) setFacultyList(data);
    } catch (error) {
      console.error('Error fetching faculty', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', designation: '', qualification: '', department: '', experience: '', image: null });
    setShowModal(true);
  };

  const openEditModal = (faculty) => {
    setIsEditing(true);
    setEditId(faculty._id);
    setFormData({
      name: faculty.name,
      designation: faculty.designation,
      qualification: faculty.qualification,
      department: faculty.department,
      experience: faculty.experience,
      image: null,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(`/api/faculty/${editId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('/api/faculty', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setShowModal(false);
      fetchFaculty();
    } catch (error) {
      alert(isEditing ? 'Error updating faculty profile' : 'Error creating faculty profile');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`/api/faculty/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFaculty();
      } catch (error) {
        alert('Error deleting profile');
      }
    }
  };

  return (
    <>
      <Helmet><title>Manage Faculty | Admin</title></Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Faculty</h1>
          <button 
            onClick={openAddModal}
            className="bg-[var(--color-medical-blue)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800"
          >
            <Plus size={20} className="mr-2" /> Add Faculty
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
              ) : facultyList.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4 text-gray-500">No faculty profiles found.</td></tr>
              ) : (
                facultyList.map((faculty) => (
                  <tr key={faculty._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={faculty.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{faculty.name}</div>
                          <div className="text-sm text-gray-500">{faculty.qualification}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openEditModal(faculty)} className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(faculty._id)} className="text-red-600 hover:text-red-900 ml-4">
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Faculty' : 'Add New Faculty'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input type="text" name="designation" required value={formData.designation} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input type="text" name="qualification" required value={formData.qualification} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" name="department" required value={formData.department} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years/Details)</label>
                <input type="text" name="experience" required value={formData.experience} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image {isEditing && <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>}</label>
                <input type="file" name="image" accept="image/*" required={!isEditing} onChange={handleFileChange} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[var(--color-medical-blue)] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800">
                  {isEditing ? 'Save Changes' : 'Save Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyCRUD;
