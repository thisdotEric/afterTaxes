import React from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import type { Column } from 'react-table';
import type { ExpensesHistory } from './Expenses';
import { green, red } from '../../components/styles/colors';
import { Link } from 'react-router-dom';
import { Select } from '@mantine/core';
import { SelectInput } from '../../components/Input';

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
  },
] as Column<ExpensesHistory>[];
