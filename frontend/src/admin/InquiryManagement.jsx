import React, { useState, useEffect } from 'react';
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

  const handleRead = async (inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.isRead) {
      const token = localStorage.getItem('adminToken');
      try {
        await axios.put(`/api/inquiries/${inquiry._id}/read`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Update local state
        setInquiries(inquiries.map(i => i._id === inquiry._id ? { ...i, isRead: true } : i));
      } catch (error) {
        console.error('Error marking as read', error);
      }
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
                  onClick={() => handleRead(inquiry)}
                  className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors ${selectedInquiry?._id === inquiry._id ? 'bg-blue-50 border-l-4 border-[var(--color-medical-blue)]' : 'border-l-4 border-transparent'} ${!inquiry.isRead ? 'font-bold' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-gray-900 ${!inquiry.isRead ? 'font-bold' : 'font-medium'}`}>{inquiry.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${!inquiry.isRead ? 'text-gray-800' : 'text-gray-500'}`}>{inquiry.subject}</p>
                  <div className="flex justify-between items-center">
                    {!inquiry.isRead ? <Mail className="text-blue-500" size={16} /> : <MailOpen className="text-gray-400" size={16} />}
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
                <div className="text-right text-gray-500 text-sm">
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
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
