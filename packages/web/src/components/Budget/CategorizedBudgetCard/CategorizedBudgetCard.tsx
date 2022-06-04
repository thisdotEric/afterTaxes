import { Card } from '@mantine/core';
import type { CategorizedBudget } from '../../../pages/Budget';
import React, { FC } from 'react';
import { Edit, Trash } from 'tabler-icons-react';

interface CategorizedBudgetCardProps {
  categorizedBudget: CategorizedBudget;
}

const CategorizedBudgetCard: FC<CategorizedBudgetCardProps> = ({
  categorizedBudget: { budget, id, name },
}: CategorizedBudgetCardProps) => {
  return (
    <Card shadow={'sm'} id='budget-card' key={id}>
      <div>
        <p id='name'>{name}</p>
        <p id='amount'>{budget.toFixed(2)}</p>
      </div>
      <div id='actions'>
        <Edit size={20} id='edit' className='action-btn' strokeWidth={1.5} />
        &nbsp;
        <Trash
          size={20}
          id='delete'
          className='action-btn'
          onClick={() => console.log('Hey')}
          strokeWidth={1.5}
        />
      </div>{' '}
    </Card>
  );
};

export default CategorizedBudgetCard;
