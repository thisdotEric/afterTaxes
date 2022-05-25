import React from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import type { Column } from 'react-table';
import type { ExpensesHistory } from './Expenses';
import { green, red } from '../../components/styles/colors';
import { Link } from 'react-router-dom';

export const expensesColumns = [
  {
    Header: 'DATE',
    accessor: 'date',
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
    Header: 'BUDGET TYPE',
    accessor: 'budgetType',
    Cell: (row) => {
      return (
        <h4>
          <span id='budget-type'>{row.value}</span>
        </h4>
      );
    },
  },
  {
    Header: 'ACTIONS',
    accessor: 'id',
    Cell: () => {
      return (
        <span>
          <Link to={''} id='action-link'>
            Edit
          </Link>
          {'  '}
          <Link to={''} id='action-link'>
            Delete
          </Link>
        </span>
      );
    },
  },
] as Column<ExpensesHistory>[];
