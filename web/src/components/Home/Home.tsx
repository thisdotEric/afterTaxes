import React, { FC, useState } from 'react';
import './Home.css';
import { Login } from '../Login';
import { DailyQuotes } from '../DailyQuotes';

interface HomeProps {}

const Home: FC<HomeProps> = ({}: HomeProps) => {
  return (
    <div className="home">
      <DailyQuotes />
      <Login />
    </div>
  );
};

export default Home;
