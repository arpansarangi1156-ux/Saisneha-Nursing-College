import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Trash2, MailOpen, Mail } from 'lucide-react';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get('/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(data)) setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSelect = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`/api/inquiries/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status: newStatus } : i));
      if (selectedInquiry?._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status', error);
      alert('Error updating status');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.delete(`/api/inquiries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchInquiries();
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
      } catch (error) {
        alert('Error deleting message');
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-red-100 text-red-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet><title>Manage Inquiries | Admin</title></Helmet>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* List Panel */}
        <div className="w-1/3 bg-white rounded-l-xl shadow-sm border border-gray-100 overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white">
            <h1 className="text-xl font-bold text-gray-900">Inbox Messages</h1>
          </div>
          
          <div className="divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-center text-gray-500">Loading...</p>
            ) : inquiries.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No messages found.</p>
            ) : (
              inquiries.map((inquiry) => (
                <div 
                  key={inquiry._id} 
                  onClick={() => handleSelect(inquiry)}
                  className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${selectedInquiry?._id === inquiry._id ? 'bg-blue-50 border-l-4 border-[var(--color-medical-blue)]' : 'border-l-4 border-transparent'} ${inquiry.status === 'Pending' ? 'font-bold' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-gray-900 ${inquiry.status === 'Pending' ? 'font-bold' : 'font-medium'}`}>{inquiry.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${inquiry.status === 'Pending' ? 'text-gray-800' : 'text-gray-500'}`}>{inquiry.subject}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                    <button onClick={(e) => handleDelete(inquiry._id, e)} className="text-red-400 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="w-2/3 bg-gray-50 rounded-r-xl border-t border-b border-r border-gray-100 p-8 overflow-y-auto">
          {selectedInquiry ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start border-b pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedInquiry.subject}</h2>
                  <p className="text-gray-600">From: <span className="font-medium text-gray-900">{selectedInquiry.name}</span> &lt;{selectedInquiry.email}&gt;</p>
                  <p className="text-gray-600">Phone: <span className="font-medium text-gray-900">{selectedInquiry.phone}</span></p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-gray-500 text-sm mb-3">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </div>
                  <select 
                    value={selectedInquiry.status} 
                    onChange={(e) => updateStatus(selectedInquiry._id, e.target.value)}
                    className="border rounded px-3 py-1 text-sm bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="Pending">Status: Pending</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Resolved">Status: Resolved</option>
                  </select>
                </div>
              </div>
              <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MailOpen size={64} className="mb-4 opacity-50" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InquiryManagement;
