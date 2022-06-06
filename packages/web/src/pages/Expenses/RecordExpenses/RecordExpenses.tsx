import React, { FC, useReducer } from 'react';
import {
  TextInput,
  NumberInput,
  TextArea,
  DatePicker,
  BudgetDropDown,
} from '../../../components/Input';
import { Button } from '../../../components/Button';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import type { RequiredModalProps } from '../../../components/Modal/SharedModal';
import SharedModal from '../../../components/Modal/SharedModal';
import { axios } from '../../../utils';

interface RecordExpensesProps extends RequiredModalProps {}

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
}: RecordExpensesProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);

  const runDispatch = (type: ActionType, payload: string) => {
    dispatch({
      type,
      payload,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(expensesState);

    await axios.post('expenses', expensesState);

    // Clear inputs/state
    runDispatch('reset', '');
    setOpened(false);
    await onSubmit();
  };

  return (
    <SharedModal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Add new expense item'
    >
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <DatePicker
            label='Expense Date'
            value={expensesState.date}
            date={expensesState.date}
            onChange={(date) => console.log(date)}
          />

          <TextInput
            label='Expense Name'
            value={expensesState.name}
            onChange={(e) => {
              runDispatch('name', e.target.value);
            }}
          />

          <BudgetDropDown
            onChange={(budgetType) => {
              console.log(budgetType);
              runDispatch('budget_id', `${budgetType}`);
            }}
          />

          <NumberInput
            value={expensesState.amount}
            label='Expense Amount'
            onChange={(value) => {
              runDispatch('amount', `${value}`);
            }}
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

          <Button name='Save Expense' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default RecordExpenses;
