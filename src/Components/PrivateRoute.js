import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, roles }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(currentUser.role)) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default PrivateRoute;
