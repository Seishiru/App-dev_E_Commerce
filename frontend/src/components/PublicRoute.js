// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom"; // Redirect if already logged in

const PublicRoute = ({ user, children }) => {
  // If user is logged in and is an admin, redirect to home or admin page
  if (user && user.role === "admin") {
    return <Navigate to="/admin" />; // Redirect admins to the admin dashboard
  }

  // If user is logged in but not an admin, redirect to home or profile page
  if (user) {
    return <Navigate to="/" />; // Redirect non-admin users to the home page
  }

  return children; // Render public page if user is not logged in
};

export default PublicRoute;
