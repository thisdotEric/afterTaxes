import React, { FC, useReducer } from 'react';
import './RecordExpenses.css';
import { FormWrapper } from './RecordExpenses.styles';
import {
  TextInput,
  NumberInput,
  TextArea,
  DatePicker,
  BudgetDropDown,
} from '../../../components/Input';
import { Button } from '../../../components/Button';

interface RecordExpensesProps {
  setModalState: () => void;
}

interface ExpensesState {
  name: string;
  amount: number | string;
  description?: string;
}

type ActionType = 'name' | 'amount' | 'description' | 'reset';

interface ExpensesAction {
  type: ActionType;
  payload: any;
}

const initialState: ExpensesState = {
  name: '',
  amount: '',
  description: '',
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
    case 'description':
      return { ...state, description: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Invalid Type');
  }
}

const RecordExpenses: FC<RecordExpensesProps> = ({
  setModalState,
}: RecordExpensesProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);

  const runDispatch = (type: ActionType, payload: string) => {
    dispatch({
      type,
      payload,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(expensesState);

    // Clear inputs/state
    runDispatch('reset', '');
  };

  return (
    <FormWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          runDispatch('reset', '');
          setModalState();
        }}
      >
        <DatePicker label='Expense Date' date={new Date()} />

        <TextInput
          label='Expense Name'
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />

        <BudgetDropDown
          onChange={(budgetType) => {
            console.log(budgetType);
          }}
        />

        <NumberInput
          label='Expense Amount'
          onChange={(e) => {
            console.log(e);
          }}
        />

        <TextArea
          label='Additional Description'
          onChange={(e) => {
            runDispatch('description', e.target.value);
            console.log(e.target.value);
          }}
        />

        <Button name='Save Expense' />
      </form>
    </FormWrapper>
  );
};

export default RecordExpenses;
