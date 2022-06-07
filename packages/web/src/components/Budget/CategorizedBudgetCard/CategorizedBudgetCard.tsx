import { Card } from '@mantine/core';
import type {
  CategorizedBudget,
  SourceBudgetCategory,
} from '../../../pages/Budget';
import React, { FC } from 'react';
import { ArrowsLeftRight, Edit, Trash } from 'tabler-icons-react';

interface CategorizedBudgetCardProps {
  categorizedBudget: CategorizedBudget;
  openTransferBudgetModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSourceBudget: React.Dispatch<React.SetStateAction<SourceBudgetCategory>>;
}

const CategorizedBudgetCard: FC<CategorizedBudgetCardProps> = ({
  categorizedBudget: { budget, id, name, remainingBudget },
  openTransferBudgetModal,
  setSourceBudget,
}: CategorizedBudgetCardProps) => {
  return (
    <>
      <Card shadow={'sm'} id='budget-card' key={id}>
        <div>
          <p id='name'>{name}</p>
          <p id='amount'>{budget.toFixed(2)}</p>
          <p id='remaining' className={remainingBudget == 0 ? 'none' : ''}>
            {remainingBudget.toFixed(2)}
          </p>
        </div>
        <div id='actions'>
          {remainingBudget != 0 && (
            <ArrowsLeftRight
              size={15}
              stroke='white'
              id='transfer'
              className='action-btn'
              strokeWidth={1.5}
              onClick={() => {
                setSourceBudget({
                  id,
                  name,
                  remainingBudget,
                });

                openTransferBudgetModal(true);
              }}
            />
          )}
          &nbsp;
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
    </>
  );
};

export default CategorizedBudgetCard;
