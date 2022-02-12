import React, { FC, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../../pages/Layout';
import Expenses from '../../pages/Expenses/Expenses';
import { UserContext } from '../../context';
import { Login } from '../../pages/Login';
import type { ILoggedInUser } from '@aftertaxes/commons';
import { RecordExpenses } from '../../pages/Expenses/RecordExpenses';
import { Dashboard } from '../../pages/Dashboard';
import { UserProfile } from '../../pages/UserProfile';
import ProtectedRoutes from '../App/ProtectedRoutes';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  /**
   * TODO: retrieve current user from the backend
   */
  const userData = localStorage.getItem('user');
  const [user, setUser] = useState<ILoggedInUser | null>(
    userData ? JSON.parse(userData) : null
  );

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='expenses' element={<Expenses />} />
              <Route path='reports' element={<RecordExpenses />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>
          </Route>
          <Route path='/signin' element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
