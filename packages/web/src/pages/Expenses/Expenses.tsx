import React, { FC, useState } from 'react';
import { Date } from '../../components/Date';
import { month, year, day } from '../../constants/date';
import type { IDate } from '../../constants/date';

interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  const [date, setDate] = useState<IDate>({
    month,
    day,
    year,
  });

  return (
    <div>
      <Date month={date.month} year={date.year} date={date.day} />

      <p>John</p>
    </div>
  );
};

export default Expenses;
