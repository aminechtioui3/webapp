import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useAuth } from './authConf';

type ProtectedRouteProps = {
  element: React.ReactNode; // Accept an element prop instead of component
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Access auth state

  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />; // Show the component if authenticated, otherwise redirect
};

export default ProtectedRoute;
