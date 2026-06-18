import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, BookOpen, MessageSquare, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState({ counts: null, recentActivity: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const stats = [
    { title: 'Total Faculty', value: data.counts?.faculty || 0, icon: <Users size={24} className="text-blue-500" />, bg: 'bg-blue-100' },
    { title: 'Active Courses', value: data.counts?.courses || 0, icon: <BookOpen size={24} className="text-green-500" />, bg: 'bg-green-100' },
    { title: 'New Inquiries', value: data.counts?.inquiries || 0, icon: <MessageSquare size={24} className="text-purple-500" />, bg: 'bg-purple-100' },
    { title: 'Gallery Items', value: data.counts?.gallery || 0, icon: <ImageIcon size={24} className="text-orange-500" />, bg: 'bg-orange-100' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Portal</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back to the admin portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`${stat.bg} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Inquiries</h2>
        <div className="space-y-4">
          {loading ? (
            <div className="text-sm text-gray-500">Loading activity...</div>
          ) : data.recentActivity.length === 0 ? (
            <div className="text-sm text-gray-500">No recent inquiries.</div>
          ) : (
            data.recentActivity.map((inquiry) => (
              <div key={inquiry._id} className="flex items-center text-sm text-gray-600 border-b pb-3 last:border-0">
                <span className={`w-2 h-2 rounded-full mr-3 ${inquiry.status === 'New' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                <span>
                  <strong>{inquiry.name}</strong> sent an inquiry regarding <em>{inquiry.courseOfInterest || 'General Admission'}</em>.
                </span>
                <span className="ml-auto text-gray-400">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
