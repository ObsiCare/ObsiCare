// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, redirect ke halaman landing atau signin
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Jika ada token, izinkan akses
  return children;
};

export default PrivateRoute;