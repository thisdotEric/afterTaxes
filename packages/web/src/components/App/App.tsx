import React, { FC, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Layout } from '../../pages/Layout';
import Expenses from '../../pages/Expenses/Expenses';
import { UserContext } from '../../context';
import { Login } from '../../pages/Login';
import type { ILoggedInUser } from '@aftertaxes/commons';
import { Dashboard } from '../../pages/Dashboard';
import { UserProfile } from '../../pages/UserProfile';
import ProtectedRoutes from '../App/ProtectedRoutes';
import Budget from '../../pages/Budget';
import FundsHistory from '../../pages/FundsHistory';
import BudgetCategories from '../../pages/Budget/BudgetCategories';
import NotFoundPage from '../../pages/404';
import { AnimatePresence } from 'framer-motion';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  const userData = localStorage.getItem('user');
  const [user, setUser] = useState<ILoggedInUser | null>(
    userData ? JSON.parse(userData) : null
  );

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const location = useLocation();

  return (
    <UserContext.Provider value={value}>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route path='' element={<Navigate to={'/dashboard'} />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='expenses'>
                <Route path='' element={<Expenses />} />
              </Route>
              <Route path='budget'>
                <Route path='' element={<Budget />} />
                <Route path='history' element={<FundsHistory />} />
                <Route path='categories' element={<BudgetCategories />} />
              </Route>
              <Route
                path='reports'
                element={
                  <>
                    <p>Reports</p>
                  </>
                }
              />
              <Route path='profile' element={<UserProfile />} />
            </Route>
          </Route>
          <Route path='/signin' element={<Login />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </UserContext.Provider>
  );
};

export default App;
