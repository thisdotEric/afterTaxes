import React, { FC, useMemo, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../../pages/LandingPage';
import { Dashboard } from '../../pages/Dashboard';
import { RecordExpenses } from '../../pages/Expenses/RecordExpenses';
import Expenses from '../../pages/Expenses/Expenses';
import { Day } from '../../pages/Reports';
import ProtectedRoutes from './ProtectedRoutes';
import { IUser, UserContext } from '../../context';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  const [user, setUser] = useState<IUser>({ name: '', email: ' ' });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Dashboard />}>
              <Route path='/dashboard' element={<RecordExpenses />} />
              <Route path='/expenses' element={<Expenses />} />
              <Route path='/reports' element={<Day />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
