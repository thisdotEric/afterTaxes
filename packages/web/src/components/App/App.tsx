import React, { FC, useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../../pages/Layout';
import Expenses from '../../pages/Expenses/Expenses';
import ProtectedRoutes from './ProtectedRoutes';
import { UserContext } from '../../context';
import { Login } from '../../pages/Login';
import type { ILoggedInUser } from '@aftertaxes/commons';
import { RecordExpenses } from '../../pages/Expenses/RecordExpenses';
import { Dashboard } from '../../pages/Dashboard';
import { IDate, month, day, year } from '../../constants/date';
import { UserProfile } from '../../pages/UserProfile';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  const [user, setUser] = useState<ILoggedInUser | null>(null);
  const [currentDate, setCurrentDate] = useState<IDate>({ day, month, year });

  const value = useMemo(
    () => ({ user, setUser, currentDate, setCurrentDate }),
    [user, setUser, currentDate, setCurrentDate]
  );

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
