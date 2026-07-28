import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Save, CheckCircle } from 'lucide-react';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    address: '',
    mainPhone: '',
    admissionsPhone: '',
    infoEmail: '',
    admissionsEmail: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    homeHeroSubtitle: '',
    googleMapsIframe: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [homeImageFile, setHomeImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get('/api/settings');
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching settings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    const token = localStorage.getItem('adminToken');
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key] || '');
    });
    if (homeImageFile) submitData.append('homeHeroImage', homeImageFile);
    if (aboutImageFile) submitData.append('aboutCampusImage', aboutImageFile);

    try {
      await axios.put('/api/settings', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      fetchSettings();
      setHomeImageFile(null);
      setAboutImageFile(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Error saving settings');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
  }

  return (
    <>
      <Helmet><title>Site Settings | Admin</title></Helmet>
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Global Site Settings</h1>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
            <CheckCircle className="mr-3" size={24} />
            Settings saved successfully!
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit}>
            
            {/* Contact Details Section */}
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus Address</label>
                  <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Phone Number</label>
                  <input type="text" name="mainPhone" value={formData.mainPhone || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admissions Phone Number</label>
                  <input type="text" name="admissionsPhone" value={formData.admissionsPhone || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">General Info Email</label>
                  <input type="email" name="infoEmail" value={formData.infoEmail || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admissions Email</label>
                  <input type="email" name="admissionsEmail" value={formData.admissionsEmail || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div className="col-span-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed iframe (HTML)</label>
                  <textarea name="googleMapsIframe" rows="3" value={formData.googleMapsIframe || ''} onChange={handleInputChange} placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none font-mono text-sm"></textarea>
                  <p className="text-xs text-gray-500 mt-1">Go to Google Maps &gt; Search your college &gt; Click "Share" &gt; Click "Embed a map" &gt; Click "Copy HTML" and paste it here.</p>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="p-8 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Social Media Links</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input type="url" name="facebookUrl" value={formData.facebookUrl || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                  <input type="url" name="twitterUrl" value={formData.twitterUrl || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                  <input type="url" name="instagramUrl" value={formData.instagramUrl || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input type="url" name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none" />
                </div>
              </div>
            </div>

            {/* Site Meta Section */}
            <div className="p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Website Content & Images</h2>
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Page Hero Subtitle</label>
                  <textarea name="homeHeroSubtitle" rows="2" value={formData.homeHeroSubtitle || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-[var(--color-medical-blue)] focus:border-[var(--color-medical-blue)] outline-none"></textarea>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Page Hero Image</label>
                    {formData.homeHeroImage && (
                      <div className="mb-2">
                        <img src={formData.homeHeroImage} alt="Current Home" className="w-full h-32 object-cover rounded-md" />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => setHomeImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    <p className="text-xs text-gray-500 mt-1">Upload to replace current image.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Page Campus Image</label>
                    {formData.aboutCampusImage && (
                      <div className="mb-2">
                        <img src={formData.aboutCampusImage} alt="Current Campus" className="w-full h-32 object-cover rounded-md" />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => setAboutImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    <p className="text-xs text-gray-500 mt-1">Upload to replace current image.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-[var(--color-medical-blue)] text-white px-8 py-3 rounded-lg font-bold flex items-center hover:bg-blue-800 transition-colors disabled:opacity-70"
              >
                {saving ? 'Saving...' : (
                  <><Save size={20} className="mr-2" /> Save Settings</>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
