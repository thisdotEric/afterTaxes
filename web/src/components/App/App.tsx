import React, { FC } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Dashboard } from '../../pages/Dashboard';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
