import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AdminProtectedRoutes = ({ element }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')); // Get current user from localStorage or Redux state

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" />; // Redirect if user is not authenticated or not an admin
  }

  return <ProtectedRoutes>{element}</ProtectedRoutes>; // Render the protected routes if user is an admin
};

export default AdminProtectedRoutes;
