import React, { FC, useEffect, useState } from 'react';
import { useSetHeader } from '../../hooks';
import { Timeline, Text, Card, Button } from '@mantine/core';
import { month, year } from '../../constants/date';
import { Edit, Minus, Plus, Trash } from 'tabler-icons-react';
import {
  BudgetCards,
  BudgetHeaderWrapper,
  BudgetText,
  BudgetWrapper,
} from './Budget.styles';
import BudgetTimeline from '../../components/Budget/BudgetTimeline';
import { useModals } from '@mantine/modals';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';

interface BudgetProps {}

export interface IBudgetTimeline {
  amount: number;
  description: string;
  date: Date;
  deductFunds?: boolean;
}

interface Budget {
  budget_id: number;
  name: string;
  amount: number;
}

const Budget: FC<BudgetProps> = ({}: BudgetProps) => {
  useSetHeader('Budget', {
    year,
    month,
  });

  const [budget, setBudget] = useState<Budget[]>([
    {
      budget_id: 0,
      name: 'Transportation',
      amount: 300,
    },
    {
      budget_id: 1,
      name: 'Food',
      amount: 1000,
    },
    {
      budget_id: 2,
      name: 'Personal Hygiene',
      amount: 300,
    },
    {
      budget_id: 3,
      name: 'Tech',
      amount: 1000,
    },
    {
      budget_id: 4,
      name: 'Savings',
      amount: 300,
    },
    {
      budget_id: 5,
      name: 'Buffer',
      amount: 1000,
    },
  ]);

  const modals = useModals();

  const [openAddFundsModal, setOpenAddFundsModal] = useState<boolean>(false);

  const openConfirmModal = (budget_id: number) =>
    modals.openConfirmModal({
      title: 'Confirm remove budget?',
      confirmProps: {
        color: 'red',
      },
      labels: { confirm: 'Remove Budget', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        setBudget((old) => old.filter((b) => b.budget_id != budget_id)),
    });

  useEffect(() => {
    console.log('Hello');
  }, []);

  return (
    <BudgetWrapper>
      {/* <BudgetTimeline timeline={budgetTimeline} /> */}

      <BudgetHeaderWrapper>
        <BudgetText>
          Total Monthly Budget: <span>1000.50</span>
        </BudgetText>
        <BudgetText>
          Unallocated Budget:{' '}
          <span>
            89.25 <span>(20%)</span>
          </span>
        </BudgetText>
        <Button size='xs' onClick={() => setOpenAddFundsModal(true)}>
          Add funds
        </Button>
      </BudgetHeaderWrapper>

      {/* Modal */}
      <AddBudgetModal
        opened={openAddFundsModal}
        setOpened={setOpenAddFundsModal}
      />

      <div id='allocated-budgets-actions'>
        <p>Allocated Budgets</p>
        <Button id='create-new-budget' size='xs'>
          + Create new budget
        </Button>
      </div>

      <BudgetCards>
        {budget.map(({ amount, name, budget_id }) => (
          <Card shadow={'sm'} id='budget-card' key={budget_id}>
            <div>
              <p id='name'>{name}</p>
              <p id='amount'>{amount.toFixed(2)}</p>
            </div>
            <div id='actions'>
              <Edit
                size={20}
                id='edit'
                className='action-btn'
                strokeWidth={1.5}
              />
              &nbsp;
              <Trash
                size={20}
                id='delete'
                className='action-btn'
                onClick={() => openConfirmModal(budget_id)}
                strokeWidth={1.5}
              />
            </div>
          </Card>
        ))}
      </BudgetCards>
    </BudgetWrapper>
  );
};

export default Budget;
