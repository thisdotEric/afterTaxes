import React, { FC, useEffect, useState } from 'react';
import './Expenses.css';
import { angle_down, angle_up } from '../../assets';
import { Date } from '../../components/Date';
import { tableHeaders, getTimeIn24HourFormat } from '../../constants';
import { TableHeader } from '../../components/Table';
import expensesOverview from '../../data';
import { ChevronDown, ChevronUp } from 'react-feather';

interface ExpensesProps {}

interface DailyExpenses {
  index: number;
  time: string;
  expenses: string;
  amount: number;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  useEffect(() => {
    document.title = 'Expenses';
  }, []);

  //Change to null after
  const [clicked, setClicked] = useState<null | number>(0);
  const [expenses, setExpenses] = useState<DailyExpenses[]>([
    {
      index: 0,
      time: getTimeIn24HourFormat(),
      expenses: '0',
      amount: 0,
    },
  ]);

  const toggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <div className="expenses">
      <Date month={12} year={2021} />

      <div className="history">
        {/* <TableHeader /> */}

        {expensesOverview.map((history, index: number) => (
          <div className="history-cards">
            <table
              key={history.day}
              onClick={() => {
                toggle(index);
              }}
            >
              <tbody>
                <tr className="history-cards">
                  <td id="day">{history.day}</td>
                  <td id="budget">{history.budget.toFixed(2)}</td>
                  <td id="spent">{history.spent.toFixed(2)}</td>
                  <td
                    id={`${
                      history.spent_percentage <= 100
                        ? 'under-spent'
                        : 'over-spent'
                    }`}
                  >
                    {history.spent_percentage}%
                  </td>
                  <td id="remaining">{history.remaining.toFixed(2)}</td>
                  <td id="angle">
                    {clicked === index ? (
                      <ChevronUp id="angle-icon" />
                    ) : (
                      <ChevronDown id="angle-icon" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {clicked === index && (
              <div className="accordion-content">
                <p>data</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
