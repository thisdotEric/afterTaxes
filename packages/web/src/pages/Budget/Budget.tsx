import React, { FC, useEffect, useState } from 'react';
import { useSetHeader } from '../../hooks';
import { Card, Button } from '@mantine/core';
import { month, year } from '../../constants/date';
import { Edit, Trash } from 'tabler-icons-react';
import { BudgetCards, BudgetWrapper } from './Budget.styles';
import { useModals } from '@mantine/modals';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import axios from 'axios';
import BudgetHeader from '../../components/Budget/BudgetHeader';
import CategorizedBudgetCard from '../../components/Budget/CategorizedBudgetCard';
import CreateCategorizedBudgetModal from '../../components/Budget/CreateCategorizedBudgetModal';

interface BudgetProps {}

export interface IBudgetTimeline {
  amount: number;
  description: string;
  date: Date;
  deductFunds?: boolean;
}

export interface CategorizedBudget {
  id: number;
  name: string;
  budget: number;
  category: string;
}

export interface BudgetBreakdown {
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

  const [budgets, setBudgets] = useState<CategorizedBudget[]>([]);
  const [openAddFundsModal, setOpenAddFundsModal] = useState<boolean>(false);
  const [openCreateBudgetModal, setOpenCreateBudgetModal] =
    useState<boolean>(false);

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
        setBudgets((old) => old.filter((b) => b.id != budget_id)),
    });

  const fetchBudgetPageValues = async () => {
    const { data } = await axios.get(
      'http://localhost:3000/api/v1/budgets/2022/06'
    );
    setBudgetBreakdown({
      total: data.total,
      unallocated: data.unallocated,
    });

    const { data: categorized_budget } = await axios.get(
      'http://localhost:3000/api/v1/budgets/2022/06/categories'
    );
    setBudgets(categorized_budget);
  };

  useEffect(() => {
    fetchBudgetPageValues();
  }, []);

  return (
    <BudgetWrapper>
      <BudgetHeader
        budgetBreakdown={budgetBreakdown}
        openAddFundsModal={setOpenAddFundsModal}
      />

      <div id='allocated-budgets-actions'>
        <p>Allocated Budgets</p>
        <Button
          id='create-new-budget'
          size='xs'
          onClick={() => setOpenCreateBudgetModal(true)}
        >
          + Create new budget
        </Button>
      </div>

      {/* Modal */}
      <AddBudgetModal
        opened={openAddFundsModal}
        setOpened={setOpenAddFundsModal}
        onSubmit={async () => {
          await fetchBudgetPageValues();
        }}
      />

      <CreateCategorizedBudgetModal
        remainingBudget={budgetBreakdown.unallocated}
        opened={openCreateBudgetModal}
        setOpened={setOpenCreateBudgetModal}
        onSubmit={async () => {
          console.log(1);
        }}
      />

      <BudgetCards>
        {budgets &&
          budgets.map((budget) => (
            <CategorizedBudgetCard categorizedBudget={budget} />
          ))}
      </BudgetCards>
    </BudgetWrapper>
  );
};

export default Budget;
