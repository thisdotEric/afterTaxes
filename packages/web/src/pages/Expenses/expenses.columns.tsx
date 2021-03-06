import { red } from '../../components/styles/colors';
import React from 'react';
import type { Column } from 'react-table';
import type { ExpensesHistory } from './Expenses';

export const expensesColumns = [
  {
    Header: 'DATE',
    accessor: 'date',
    Cell: (row) => <p>{new Date(row.value).getDate()}</p>,
  },
  {
    Header: 'AMOUNT',
    accessor: 'amount',
    Cell: (row) => <p id='expense-amt'> &#x20B1;{row.value.toFixed(2)}</p>,
  },
  {
    Header: 'EXPENSE',
    accessor: 'name',
  },
  {
    Header: 'DESCRIPTION',
    accessor: 'description',
    Cell: (row) => {
      return <span id='description'>{row.value}</span>;
    },
  },
  {
    Header: 'CATEGORY',
    accessor: 'budgetName',
    Cell: ({
      row: {
        original: { originatingBudgetDeleted, budgetName },
      },
    }) => {
      const deletedStyle = { color: 'gray', fontStyle: 'italic' };

      return (
        <p style={originatingBudgetDeleted ? deletedStyle : {}}>
          {budgetName}{' '}
          {originatingBudgetDeleted && (
            <span style={{ color: `${red}` }}>* </span>
          )}
        </p>
      );
    },
  },
] as Column<ExpensesHistory>[];
