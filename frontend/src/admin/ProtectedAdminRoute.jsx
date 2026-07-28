import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem('adminToken');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Otherwise render the child routes (Admin Layout)
  return <Outlet />;
};

export default ProtectedAdminRoute;
