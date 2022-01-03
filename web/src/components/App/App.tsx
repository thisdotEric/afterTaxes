import React, { FC } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../../pages/LandingPage';
import { Dashboard } from '../../pages/Dashboard';
import { RecordExpenses } from '../../pages/Expenses/RecordExpenses';
import Expenses from '../../pages/Expenses/Expenses';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/dashboard" element={<RecordExpenses />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
