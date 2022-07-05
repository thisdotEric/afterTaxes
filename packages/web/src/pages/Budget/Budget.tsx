import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSetHeader } from '../../hooks';
import { Button } from '@mantine/core';
import { BudgetCards, BudgetWrapper } from './Budget.styles';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import { axios } from '../../utils';
import BudgetHeader from '../../components/Budget/BudgetHeader';
import CategorizedBudgetCard from '../../components/Budget/CategorizedBudgetCard';
import CreateCategorizedBudgetModal from '../../components/Budget/CreateCategorizedBudgetModal';
import TransferBudgetModal from '../../components/Budget/TransferBudgetModal';
import type { DestinationBudgets } from '@components/Budget/TransferBudgetModal/TransferBudgetModal';
import type { ActionList } from '../../components/Menu/ActionMenu';
import { History, Minus, Notes, Plus } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { HeaderContext } from '../../context';
import { getMonthAndYear } from '../../utils/date';

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

export type FundsOperation = 'add' | 'remove';

const Budget: FC<BudgetProps> = ({}: BudgetProps) => {
  useSetHeader('Budget', 'Budget');
  const {
    header: { date },
  } = useContext(HeaderContext);

  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown>({
    total: 0,
    unallocated: 0,
  });

  const [budgets, setBudgets] = useState<CategorizedBudget[]>([]);
  const [openAddFundsModal, setOpenAddFundsModal] = useState<boolean>(false);
  const [fundsOperation, setFundsOperation] = useState<FundsOperation>('add');
  const remainingBudget = useMemo(
    () => budgetBreakdown.unallocated,
    [budgetBreakdown.unallocated]
  );

  const [openCreateBudgetModal, setOpenCreateBudgetModal] =
    useState<boolean>(false);
  const [openTransferBudget, setOpenTransferBudget] = useState(false);

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
      action: () => {
        setFundsOperation('add');
        setOpenAddFundsModal(true);
      },
    },
    {
      label: 'Remove funds',
      icon: <Minus size={15} />,
      isDanger: true,
      value: 'viewAll',
      action: () => {
        setFundsOperation('remove');
        setOpenAddFundsModal(true);
      },
    },
    {
      label: 'Budget categories',
      icon: <Notes size={15} />,
      value: 'viewAll',
      action: () => {
        navigate('/budget/categories');
      },
    },
    {
      label: 'Funds History',
      icon: <History size={15} />,
      value: 'fundsHistory',
      action: () => {
        navigate('/budget/history');
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

  const fetchBudgetPageValues = useCallback(async () => {
    const { month, year } = getMonthAndYear(date);

    const { data } = await axios.get(`budgets/${year}/${month}`);
    setBudgetBreakdown({
      total: data.total,
      unallocated: data.unallocated,
    });

    const { data: categorized_budget } = await axios.get(
      `budgets/${year}/${month}/categories`
    );
    setBudgets(categorized_budget);
  }, [date]);

  useEffect(() => {
    fetchBudgetPageValues();
  }, []);

  useEffect(() => {
    console.log("Date's changed");

    fetchBudgetPageValues();
  }, [date]);

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
          + Allocate Budget
        </Button>
      </div>

      {/* Modal */}
      <AddBudgetModal
        opened={openAddFundsModal}
        fundsOperation={fundsOperation}
        setOpened={setOpenAddFundsModal}
        remainingBudget={fundsOperation === 'remove' ? remainingBudget : 0}
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
              onSubmit={async () => await fetchBudgetPageValues()}
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
