import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  TextInput,
  NumberInput,
  TextArea,
  DatePicker,
  BudgetDropDown,
} from '../../Input';
import { Button } from '../../Button';
import { FormWrapper } from '../../styles/FormWrapper.styles';
import type { RequiredModalProps } from '../../Modal/SharedModal';
import SharedModal from '../../Modal/SharedModal';
import { axios } from '../../../utils';
import type { CurrentRow } from '../../../pages/Expenses/Expenses';
import type { BudgetItemProps } from '../../../components/Input/BudgetDropDown';
import { HeaderContext } from '../../../context';
import { createDateWithTime, getMonthAndYear } from '../../../utils/date';

interface RecordExpensesProps extends RequiredModalProps {
  actionType?: {
    type: 'add' | 'update';
    currentRow?: CurrentRow;
  };
  setIsEdit?: (value: React.SetStateAction<boolean>) => void;
}

interface ExpensesState {
  name: string;
  amount: number;
  description?: string;
  date: Date;
  budget_id: number;
}

type ActionType =
  | 'name'
  | 'amount'
  | 'description'
  | 'date'
  | 'budget_id'
  | 'reset';

interface ExpensesAction {
  type: ActionType;
  payload: any;
}

const initialState: ExpensesState = {
  name: '',
  amount: 0,
  description: '',
  date: new Date(),
  budget_id: 0,
};

function expensesReducer(
  state: ExpensesState,
  action: ExpensesAction
): ExpensesState {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'amount':
      return { ...state, amount: parseFloat(action.payload) };
    case 'budget_id':
      return { ...state, budget_id: parseFloat(action.payload) };
    case 'description':
      return { ...state, description: action.payload };
    case 'date':
      return { ...state, date: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Invalid Type');
  }
}

const RecordExpenses: FC<RecordExpensesProps> = ({
  onSubmit,
  opened,
  setOpened,
  actionType = {
    type: 'add',
    currentRow: { id: 0, budgetName: '' },
  },
  setIsEdit,
}: RecordExpensesProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);
  const [currentMaxAmount, setCurrentMaxAmount] = useState(0);
  const [remainingBudgets, setRemainingBudgets] = useState<BudgetItemProps[]>(
    []
  );
  const [currentRemainingBudget, setCurrentRemainingBudget] = useState(0);

  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [budgetError, setBudgetError] = useState('');

  const runDispatch = (type: ActionType, payload: any) => {
    dispatch({
      type,
      payload,
    });
  };

  const clearStates = () => {
    runDispatch('reset', '');
    setNameError('');
    setBudgetError('');
    setAmountError('');
    setCurrentMaxAmount(0);
  };

  const {
    header: { date },
  } = useContext(HeaderContext);

  const allValuesFilledUp = useCallback(() => {
    let withoutError = true;

    if (expensesState.name === '') {
      setNameError('Name is empty.');
      withoutError = false;
    }

    if (expensesState.amount === 0 || expensesState.amount > currentMaxAmount) {
      setAmountError(`Amount should not be zero.`);
      withoutError = false;
    }

    if (expensesState.amount > currentMaxAmount) {
      setAmountError(
        `Amount exceeded limit of ${currentMaxAmount.toFixed(2)}.`
      );
      withoutError = false;
    }

    if (expensesState.budget_id === 0) {
      setBudgetError('Did not select a budget type.');
      withoutError = false;
    }

    return withoutError;
  }, [expensesState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOpened(false);

    if (allValuesFilledUp()) {
      if (actionType.type === 'update')
        await axios.put('expenses', {
          id: actionType.currentRow?.id,
          ...expensesState,
        });
      else await axios.post('expenses', expensesState);

      clearStates();
      await onSubmit();
    }
  };

  const fetchRemainingBudgets = async () => {
    const { month, year } = getMonthAndYear(date);

    const { data } = await axios.get(`budgets/${year}/${month}/remaining`);

    setRemainingBudgets(() => {
      return data.map((d: any) => {
        return {
          label: d.name,
          remainingBudget: d.remainingBudget,
          value: d.budget_id,
        };
      });
    });

    setCurrentMaxAmount(0);

    if (actionType.type === 'update') {
      const currentRemainingBudget = data.filter(
        (b: any) => b.name === actionType.currentRow?.budgetName
      )[0].remainingBudget;

      setCurrentMaxAmount(currentRemainingBudget);
      setCurrentRemainingBudget(currentRemainingBudget);
    }
  };

  const fetchToBeUpdatedExpenseItem = async () => {
    const { data } = await axios.get(`expenses/${actionType.currentRow?.id}`);

    runDispatch('name', data.name);
    runDispatch('description', data.description);
    runDispatch('budget_id', data.budget_id);
    runDispatch('amount', data.amount);

    setCurrentMaxAmount((old) => {
      return old + data.amount;
    });
  };

  useEffect(() => {
    fetchRemainingBudgets();

    if (actionType.type === 'update') fetchToBeUpdatedExpenseItem();
  }, [actionType.type, date]);

  useEffect(() => {
    fetchRemainingBudgets();

    if (actionType.type === 'update') fetchToBeUpdatedExpenseItem();
  }, []);

  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        setIsEdit && setIsEdit(false);
        clearStates();
        setOpened(false);
      }}
      title={`${actionType.type === 'add' ? 'Add new' : 'Edit'} expense item`}
    >
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <DatePicker
            label='Expense Date'
            value={expensesState.date}
            date={expensesState.date}
            onChange={(date) => {
              runDispatch('date', createDateWithTime(date!));
            }}
          />

          <BudgetDropDown
            remainingBudgets={remainingBudgets}
            onChange={(budgetType) => {
              if (parseInt(budgetType!) <= 0)
                setBudgetError('Did not select a budget type.');
              else setBudgetError('');

              runDispatch('budget_id', `${budgetType}`);
            }}
            error={budgetError}
            setCurrentValue={setCurrentMaxAmount}
            placeholder={`${
              actionType.type === 'update'
                ? `${
                    actionType.currentRow?.budgetName
                  } - ${currentRemainingBudget.toFixed(2)}`
                : 'Budget Type'
            }`}
            disabled={actionType.type === 'update'}
          />

          <TextInput
            label='Expense Name'
            value={expensesState.name}
            onChange={(e) => {
              if (e.target.value === '') setNameError('Name is empty');
              else setNameError('');

              runDispatch('name', e.target.value);
            }}
            error={nameError}
          />

          <NumberInput
            value={expensesState.amount}
            label='Expense Amount'
            error={amountError}
            onChange={(value) => {
              if (value! > currentMaxAmount)
                setAmountError(
                  `Amount exceeded limit of ${currentMaxAmount.toFixed(2)}.`
                );
              else setAmountError(``);

              runDispatch('amount', `${value}`);
            }}
            disabled={actionType.currentRow?.originatingBudgetDeleted}
          />

          <TextArea
            value={
              expensesState.description === undefined
                ? ''
                : expensesState.description
            }
            label='Additional Description'
            onChange={(e) => {
              runDispatch('description', e.target.value);
            }}
          />

          <Button
            name={`${actionType.type === 'add' ? 'Save' : 'Update'} Expense`}
          />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default RecordExpenses;
