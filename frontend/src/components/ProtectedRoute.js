// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  // Check if the user is logged in and is an admin
  if (!user || user.role !== 'admin') {
    // Redirect to the home page if the user is not an admin
    return <Navigate to="/" replace />;
  }

  return children; // Render the children if the user is an admin
};

export default ProtectedRoute;
