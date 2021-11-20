import React, { FC } from 'react';
import './App.css';
import { Home } from '../Home';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  return <Home />;
};

export default App;
