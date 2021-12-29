import React, { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../../pages/LandingPage';
import { Dashboard } from '../../pages/Dashboard';
import { RecordExpenses } from '../../pages/Expenses/RecordExpenses';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/dashboard" element={<RecordExpenses />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
