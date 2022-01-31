import { year, month } from './constants/date';

interface IExpensesOverview {
  day: number;
  budget: number;
  spent: number;
  spent_percentage: number;
  remaining: number;
}

let expensesOverview: IExpensesOverview[] = [];
const max = 10000;
const min = 500;

function getNumberOfDays(month: number, year: number): number {
  const d = new Date(year, month + 1, 0);
  console.log(d);

  return d.getDate();
}

const numberOfDays = getNumberOfDays(month - 1, year);

for (let i = 1; i <= numberOfDays; i++) {
  let budget = Math.floor(Math.random() * (max - min + 1) + min) + 0.45;
  let spent = Math.floor(Math.random() * (max - min + 1) + min);
  let remaining = budget - spent;

  expensesOverview.push({
    day: i,
    budget,
    spent,
    remaining: parseFloat(remaining.toFixed(2)),
    spent_percentage: Math.round((spent / budget) * 100),
  });
}

export default expensesOverview;
