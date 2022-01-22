// import { Dashboard } from '../../pages/Dashboard';
import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRoutesProps {}

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;

const ProtectedRoutes: FC<
  ProtectedRoutesProps
> = ({}: ProtectedRoutesProps) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
