import React, { FC } from 'react';
import './App.css';

interface AppProps {}

const App: FC<AppProps> = ({}: AppProps) => {
  return (
    <div className="App">
      <p>afterTaxes Web</p>
    </div>
  );
};

export default App;
