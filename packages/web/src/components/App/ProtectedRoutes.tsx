import React, { FC, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { axios } from '../../utils';
import { UserContext } from '../../context';

interface ProtectedRoutesProps {}

const ProtectedRoutes: FC<
  ProtectedRoutesProps
> = ({}: ProtectedRoutesProps) => {
  const { user, setUser } = useContext(UserContext);

  const fetchUser = async () => {
    const { data } = await axios.get('users/me');

    setUser(data);
  };

  useEffect(() => {
    /**
     * Fetch the current user from the server
     */
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return user !== null ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
