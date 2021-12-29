import React, { FC, useState } from 'react';
import './Expenses.css';
import { angle_down, angle_up } from '../../assets';
import type { DailyExpensesOverview } from '../Dashboard/Dashboard';
import { Date } from '../../components/Date';
import { tableHeaders, getTimeIn24HourFormat } from '../../constants';
import { TableHeader } from '../../components/Table';

interface ExpensesProps {
  month: string;
  year: number;
  expensesOverview: DailyExpensesOverview[];
}

interface DailyExpenses {
  index: number;
  time: string;
  expenses: string;
  amount: number;
}

const Expenses: FC<ExpensesProps> = ({
  expensesOverview,
  year,
  month,
}: ExpensesProps) => {
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
        <TableHeader />

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
                    <img
                      src={clicked === index ? angle_up : angle_down}
                      alt="angle-down"
                      width={22}
                      height={22}
                    />
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
