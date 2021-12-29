import React, { FC } from 'react';
import './LandingPage.css';
import { Login } from '../Login';
import github from '../../assets/github.png';

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = ({}: LandingPageProps) => {
  return (
    <div className="home">
      <Login />

      <a href="https://github.com/thisdotEric/afterTaxes" target="_blank">
        <img src={github} alt="Github" width={30} height={30} />
      </a>
    </div>
  );
};

export default LandingPage;
