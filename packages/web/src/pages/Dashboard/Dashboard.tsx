import React, { FC, useContext } from 'react';
import expensesOverview from '../../data';
import { day, year, month } from '../../constants/date';
import {
  CalendarGrid,
  CalendarGridDate,
  CurrentDate,
  ExpensesOverview,
} from './Dashboard.styles';
import { useNavigate } from 'react-router-dom';
import { HeaderContext } from '../../context';
import { useSetHeader } from '../../hooks';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Card } from '@mantine/core';
import LineChart from '../../components/Charts/LineChart';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * What should be in a dashboard
 *
 *
 */

export const data = {
  labels: ['Red', 'Blue', 'Personal Hygiene', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();

  useSetHeader('Daily Budget Dashboard', 'Dashboard', {
    year,
    month,
  });

  return (
    <div>
      <Card
        style={{ height: '250px', width: '250px', backgroundColor: '#2e3139' }}
      >
        <Doughnut data={data} />
      </Card>

      <Card
        style={{
          height: '250px',
          width: '500px',
          marginTop: 15,
          backgroundColor: '#2e3139',
        }}
      >
        <LineChart />
      </Card>
      {/* <CalendarGrid>
        {expensesOverview.map((item, index) => (
          <CalendarGridDate
            title='View detailed expenses'
            key={index}
            onClick={() => {
              navigate(`/expenses`);
            }}
          >
            <CurrentDate isToday={index + 1 == day}>{item.day}</CurrentDate>
            <ExpensesOverview
              overspent={item.spent_percentage > 100}
              isToday={index + 1 == day}
            >
              <p>{item.budget}</p>
              <p>
                {item.spent} (<span>{item.spent_percentage}%</span>)
              </p>
              <div className='line'></div>
              <p>{item.remaining}</p>
            </ExpensesOverview>
          </CalendarGridDate>
        ))}
      </CalendarGrid> */}
    </div>
  );
};

export default Dashboard;
