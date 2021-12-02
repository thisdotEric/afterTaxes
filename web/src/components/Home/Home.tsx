import React, { FC } from 'react';
import './Home.css';
import { Login } from '../Login';
import github from '../../images/github.png';

interface HomeProps {}

const Home: FC<HomeProps> = ({}: HomeProps) => {
  return (
    <div className="home">
      <Login />

      <a href="https://github.com/thisdotEric/afterTaxes" target="_blank">
        <img src={github} alt="Github" width={30} height={30} />
      </a>
    </div>
  );
};

export default Home;
