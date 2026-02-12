import React from 'react';
import { Navigate } from 'react-router-dom';
import { validateAuth } from '../utils/auth';

export default function ProtectedRoute({ children, requiredRole }) {
  const userRole = localStorage.getItem('userRole');

  // Check if user is logged in
  const currentUser = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!currentUser || !token || !userRole || !isLoggedIn) {
    // Clear invalid session data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('parentName');
    localStorage.removeItem('childName');
    localStorage.removeItem('childGrade');
    return <Navigate to="/login" />;
  }

  // Validate authentication and check for session expiration
  const authValidation = validateAuth();
  if (!authValidation.isValid) {
    // Clear invalid session data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('parentName');
    localStorage.removeItem('childName');
    localStorage.removeItem('childGrade');
    return <Navigate to="/login" />;
  }

  // If a specific role or array of roles is required, check it
  if (requiredRole) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowed.includes(userRole)) {
      // Redirect to appropriate dashboard based on role
      switch (userRole) {
        case 'admin':
          return <Navigate to="/admin" />;
        case 'student':
          return <Navigate to="/student" />;
        case 'teacher':
          return <Navigate to="/teacher" />;
        case 'parent':
          return <Navigate to="/parent" />;
        case 'staff':
          return <Navigate to="/staff" />;
        default:
          return <Navigate to="/login" />;
      }
    }
  }

  return children;
}
