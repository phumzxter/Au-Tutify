import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedInRoute = () => {
  const role = localStorage.getItem('role');
  return localStorage.getItem('user') ? <Navigate to={`/${role}/dashboard`} /> : <Outlet />;
};

export default LoggedInRoute;
