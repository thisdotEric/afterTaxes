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
import axios from 'axios';

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

interface BudgetBreakdown {
  total: number;
  unallocated: number;
}

const Budget: FC<BudgetProps> = ({}: BudgetProps) => {
  useSetHeader('Budget', {
    year,
    month,
  });

  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown>({
    total: 0,
    unallocated: 0,
  });

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      amount: 100,
      budget_id: 1,
      name: 'JOhn',
    },
  ]);
  const [openAddFundsModal, setOpenAddFundsModal] = useState<boolean>(false);

  const modals = useModals();
  const openConfirmModal = (budget_id: number) =>
    modals.openConfirmModal({
      title: 'Confirm remove budget?',
      confirmProps: {
        color: 'red',
      },
      labels: { confirm: 'Remove Budget', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () =>
        setBudgets((old) => old.filter((b) => b.budget_id != budget_id)),
    });

  const fetchBudgetPageValues = async () => {
    const { data } = await axios.get(
      'http://localhost:3000/api/v1/budgets/2022/06'
    );

    setBudgetBreakdown({
      total: data.total,
      unallocated: data.unallocated,
    });
  };

  useEffect(() => {
    fetchBudgetPageValues();
  }, []);

  return (
    <BudgetWrapper>
      {/* <BudgetTimeline timeline={budgetTimeline} /> */}

      <BudgetHeaderWrapper>
        <BudgetText>
          Total Monthly Budget: <span>{budgetBreakdown.total}</span>
        </BudgetText>
        <BudgetText>
          Unallocated Budget:{' '}
          <span>
            {budgetBreakdown.unallocated} <span>(20%)</span>
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
        {budgets.map(({ amount, name, budget_id }) => (
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
