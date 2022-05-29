import { useSetHeader } from '../../hooks';
import React, { FC } from 'react';

interface BudgetProps {}

const Budget: FC<BudgetProps> = ({}: BudgetProps) => {
  useSetHeader('Budget');

  return <div></div>;
};

export default Budget;
