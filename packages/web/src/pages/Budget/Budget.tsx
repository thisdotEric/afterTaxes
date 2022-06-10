import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSetHeader } from '../../hooks';
import { Button } from '@mantine/core';
import { month, year } from '../../constants/date';
import { BudgetCards, BudgetWrapper } from './Budget.styles';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import { axios } from '../../utils';
import BudgetHeader from '../../components/Budget/BudgetHeader';
import CategorizedBudgetCard from '../../components/Budget/CategorizedBudgetCard';
import CreateCategorizedBudgetModal from '../../components/Budget/CreateCategorizedBudgetModal';
import TransferBudgetModal from '../../components/Budget/TransferBudgetModal';
import type { DestinationBudgets } from '@components/Budget/TransferBudgetModal/TransferBudgetModal';
import type { ActionList } from '../../pages/Expenses/Expenses';
import { Notes, Plus } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

interface BudgetProps {}

export interface CategorizedBudget {
  id: number;
  name: string;
  budget: number;
  category: string;
  budget_type_id: number;
  remainingBudget: number;
}

export interface BudgetBreakdown {
  total: number;
  unallocated: number;
}

export interface SourceBudgetCategory {
  remainingBudget: number;
  name: string;
  id: number;
}

export type BudgetActions = ActionList & {
  action: () => void;
};

const Budget: FC<BudgetProps> = ({}: BudgetProps) => {
  useSetHeader('Budget', 'Budget', {
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
  const [openTransferBudget, setOpenTransferBudget] = useState(false);
  const [openBudgetCategoriesModal, setOpenBudgetCategoriesModal] =
    useState(false);

  const [sourceBudget, setSourceBudget] = useState<SourceBudgetCategory>({
    id: 0,
    name: '',
    remainingBudget: 0,
  });

  const navigate = useNavigate();

  const [actionsList] = useState<BudgetActions[]>([
    {
      label: 'Add funds',
      icon: <Plus size={15} />,
      value: 'addFunds',
      action: () => setOpenAddFundsModal(true),
    },
    {
      label: 'Budget categories',
      icon: <Notes size={15} />,
      value: 'viewAll',
      action: () => {
        navigate('/budget/categories');
      },
    },
  ]);

  // Remove the originating budget from the destination budget
  const destinationBudgets = useMemo<DestinationBudgets[]>(
    () =>
      budgets
        .filter(({ id }) => id != sourceBudget.id)
        .map(({ name, id }) => ({
          label: name,
          value: `${id}`,
        })),
    [sourceBudget.id]
  );

  const fetchBudgetPageValues = async () => {
    const { data } = await axios.get('budgets/2022/06');
    setBudgetBreakdown({
      total: data.total,
      unallocated: data.unallocated,
    });

    const { data: categorized_budget } = await axios.get(
      'budgets/2022/06/categories'
    );
    setBudgets(categorized_budget);
  };

  useEffect(() => {
    fetchBudgetPageValues();
  }, []);

  return (
    <BudgetWrapper>
      <BudgetHeader budgetBreakdown={budgetBreakdown} actions={actionsList} />

      <div id='allocated-budgets-actions'>
        <p>Monthly Allocated Budgets</p>
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
          await fetchBudgetPageValues();
        }}
      />

      <BudgetCards>
        {budgets &&
          budgets.map((budget) => (
            <CategorizedBudgetCard
              categorizedBudget={budget}
              openTransferBudgetModal={setOpenTransferBudget}
              setSourceBudget={setSourceBudget}
            />
          ))}
      </BudgetCards>

      <TransferBudgetModal
        sourceBudget={sourceBudget}
        destinationBudgets={destinationBudgets}
        onSubmit={async () => {
          await fetchBudgetPageValues();
        }}
        opened={openTransferBudget}
        setOpened={setOpenTransferBudget}
      />
    </BudgetWrapper>
  );
};

export default Budget;
