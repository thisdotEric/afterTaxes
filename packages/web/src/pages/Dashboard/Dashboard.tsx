import React, { FC, useEffect } from 'react';
import expensesOverview from '../../data';
import { day } from '../../constants/date';
import {
  CalendarGrid,
  CalendarGridDate,
  CurrentDate,
  ExpensesOverview,
} from './Dashboard.styles';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}: DashboardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Expenses';
  }, []);

  return (
    <div>
      <CalendarGrid>
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
      </CalendarGrid>
    </div>
  );
};

export default Dashboard;
