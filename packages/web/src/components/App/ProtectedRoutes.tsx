import React, { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context';

interface ProtectedRoutesProps {}

const ProtectedRoutes: FC<
  ProtectedRoutesProps
> = ({}: ProtectedRoutesProps) => {
  const { user } = useContext(UserContext);
  return user !== null ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
