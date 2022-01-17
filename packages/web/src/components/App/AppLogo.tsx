import React, { FC } from 'react';
import './App.css';

interface AppLogoProps {}

const AppLogo: FC<AppLogoProps> = ({}: AppLogoProps) => {
  return (
    <div className="app">
      <p id="aftertaxes">
        <span>after</span>Taxes
      </p>
    </div>
  );
};

export default AppLogo;
