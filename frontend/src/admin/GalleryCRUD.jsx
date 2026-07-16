import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Plus, Trash2, Edit, X } from 'lucide-react';

const GalleryCRUD = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Events',
    image: null,
  });

  const fetchGallery = async () => {
    try {
      const { data } = await axios.get('/api/gallery');
      if (Array.isArray(data)) setImages(data);
    } catch (error) {
      console.error('Error fetching gallery', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
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
    setFormData({ title: '', category: 'Events', image: null });
    setShowModal(true);
  };

  const openEditModal = (img) => {
    setIsEditing(true);
    setEditId(img._id);
    setFormData({
      title: img.title,
      category: img.category,
      image: null,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await axios.put(`/api/gallery/${editId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('/api/gallery', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setShowModal(false);
      fetchGallery();
    } catch (error) {
      alert(isEditing ? 'Error updating image' : 'Error uploading image');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`/api/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchGallery();
      } catch (error) {
        alert('Error deleting image');
      }
    }
  };

  return (
    <>
      <Helmet><title>Manage Gallery | Admin</title></Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
          <button 
            onClick={openAddModal}
            className="bg-[var(--color-medical-blue)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800"
          >
            <Plus size={20} className="mr-2" /> Upload Image
          </button>
        </div>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading images...</p>
        ) : images.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center text-gray-500 shadow-sm border border-gray-100">
            No images uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="h-48 w-full relative overflow-hidden">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(img)} className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(img._id)} className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{img.title}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-50 text-[var(--color-medical-blue)] text-xs rounded-md mt-2">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Gallery Image' : 'Upload Gallery Image'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Description</label>
                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2">
                  <option value="Events">Events</option>
                  <option value="Campus">Campus</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Image File {isEditing && <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>}</label>
                <input type="file" accept="image/*" required={!isEditing} onChange={handleFileChange} className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[var(--color-medical-blue)] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800">
                  {isEditing ? 'Save Changes' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryCRUD;
