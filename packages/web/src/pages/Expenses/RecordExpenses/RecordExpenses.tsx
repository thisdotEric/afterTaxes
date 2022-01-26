import React, { FC, useReducer } from 'react';
import './RecordExpenses.css';
import { Date } from '../../../components/Date';
import { TextInput } from '../../../components/Form';
import { SubmitButton } from '../../../components/Form';
import { month, day, year } from '../../../constants/date';

interface RecordExpensesProps {}

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

const RecordExpenses: FC<RecordExpensesProps> = ({}: RecordExpensesProps) => {
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
    <>
      <Date month={month} year={year} date={day} />
      <div className='form'>
        <div className='input-form'>
          <form
            action=''
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className='record-expenses'>
              <TextInput
                name='name'
                title='Expenses name'
                label='Name'
                type='text'
                value={expensesState.name}
                required={false}
                onChange={(e) => {
                  runDispatch('name', e.currentTarget.value);
                }}
                width={415}
              />
              <TextInput
                name='amount'
                title='Amount'
                label='Amount'
                type='number'
                step='0.0001'
                value={expensesState.amount}
                required={false}
                width={415}
                onChange={(e) => {
                  runDispatch('amount', e.currentTarget.value);
                }}
              />
              <textarea
                cols={39}
                placeholder='(Addtional) Description'
                spellCheck='false'
                rows={8}
                value={expensesState.description}
                onChange={(e) => {
                  runDispatch('description', e.target.value);
                }}
              />
              <div className='actions'>
                <SubmitButton
                  id='save-btn'
                  name='submit'
                  value='Save Expenses'
                />
                <button
                  id='reset-btn'
                  onClick={(e) => {
                    runDispatch('reset', '');
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecordExpenses;
