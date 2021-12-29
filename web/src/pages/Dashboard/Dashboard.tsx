import React, { FC, useState } from 'react';
import './Dashboard.css';
import dummyData from '../../data';
import { User } from '../../components/User';
import { RecordExpenses } from '../Expenses/RecordExpenses';

interface DashboardProps {}

export interface DailyExpensesOverview {
  day: number;
  budget: number;
  spent: number;
  spent_percentage: number;
  remaining: number;
}

const AppLogo = () => {
  return (
    <div className="app">
      <p>afterTaxes</p>
    </div>
  );
};

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const [expensesOverview, setExpensesOverview] =
    useState<DailyExpensesOverview[]>(dummyData);

  return (
    <div className="dashboard">
      <div className="left">
        <AppLogo />

        <User fullName="John Eric Siguenza" />
      </div>
      <div className="main">
        {/* <Expenses
          year={2021}
          month="December"
          expensesOverview={expensesOverview}
        /> */}
        <RecordExpenses />
      </div>
    </div>
  );
};

export default Dashboard;
