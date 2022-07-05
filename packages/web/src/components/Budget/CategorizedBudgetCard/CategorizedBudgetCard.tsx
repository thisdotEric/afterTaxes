import { Card } from '@mantine/core';
import type {
  CategorizedBudget,
  SourceBudgetCategory,
} from '../../../pages/Budget';
import React, { FC, useState } from 'react';
import { ArrowsLeftRight, Edit, Trash } from 'tabler-icons-react';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { axios } from '../../../utils';

interface CategorizedBudgetCardProps {
  categorizedBudget: CategorizedBudget;
  openTransferBudgetModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSourceBudget: React.Dispatch<React.SetStateAction<SourceBudgetCategory>>;
  onSubmit: () => Promise<void>;
}

const CategorizedBudgetCard: FC<CategorizedBudgetCardProps> = ({
  categorizedBudget: { budget, id, name, remainingBudget, budget_type_id },
  openTransferBudgetModal,
  setSourceBudget,
  onSubmit,
}: CategorizedBudgetCardProps) => {
  const [openedConfirmDeleteModal, setOpenedConfirmDeleteModal] =
    useState<boolean>(false);

  return (
    <>
      <ConfirmModal
        opened={openedConfirmDeleteModal}
        setOpened={setOpenedConfirmDeleteModal}
        onSubmit={async () => {
          console.log('Budget CAtegory Id: ', budget_type_id);

          await axios.delete(`budgets/${id}`);
          await onSubmit();
        }}
        modalTitle='Confirm delete budget?'
        confirmMessage='Delete Budget'
      />

      <Card shadow={'sm'} id='budget-card' key={id}>
        <div>
          <p id='name'>{name}</p>
          <p id='amount'>{budget.toFixed(2)}</p>
          <p id='remaining' className={remainingBudget == 0 ? 'none' : ''}>
            {remainingBudget.toFixed(2)}
          </p>
        </div>
        <div id='actions'>
          <ArrowsLeftRight
            size={15}
            stroke='white'
            id='transfer'
            className={`action-btn ${remainingBudget == 0 && 'hidden'}`}
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
          &nbsp;
          <Edit size={20} id='edit' className='action-btn' strokeWidth={1.5} />
          &nbsp;
          <Trash
            size={20}
            id='delete'
            className='action-btn'
            onClick={() => {
              setOpenedConfirmDeleteModal(true);
            }}
            strokeWidth={1.5}
          />
        </div>{' '}
      </Card>
    </>
  );
};

export default CategorizedBudgetCard;
