import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, roles }) => {
  var x = 
  {
    role:"super-admin"
  }
  localStorage.setItem('user',JSON.stringify(x))
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (!roles.includes(currentUser.role))
    return <Navigate to="/" />;
  return element;
};

export default PrivateRoute;
