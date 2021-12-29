import React, { FC } from 'react';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App';
import { User } from '../../components/User';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  return (
    <div className="dashboard">
      <div className="side-nav">
        <div>
          <AppLogo />
          <SideNav />
        </div>
        <User fullName="John Eric Siguenza" />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
