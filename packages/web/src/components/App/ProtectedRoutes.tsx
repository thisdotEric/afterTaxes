import React, { FC, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { axios } from '../../utils';
import { UserContext } from '../../context';

interface ProtectedRoutesProps {}

const ProtectedRoutes: FC<
  ProtectedRoutesProps
> = ({}: ProtectedRoutesProps) => {
  const { user, setUser } = useContext(UserContext);

  /**
   * Fetch the valid current user from the server
   * in order to pass the protected route
   */
  const fetchUser = async () => {
    const { data } = await axios.get('users/me');

    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user !== null ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
