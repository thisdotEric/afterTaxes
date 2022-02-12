import React, { FC, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context';

interface ProtectedRoutesProps {}

/**
 * TODO: retrieve current user from the backend
 */
const ProtectedRoutes: FC<
  ProtectedRoutesProps
> = ({}: ProtectedRoutesProps) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, setUser]);

  return user !== null ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
