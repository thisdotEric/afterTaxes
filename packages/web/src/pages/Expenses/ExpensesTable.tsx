import React, { FC, useMemo } from 'react';
import './Expenses.css';
import { Button, Table, TextInput } from '@mantine/core';
import { Column, useTable } from 'react-table';
import { ExpensesTableWrapper, TableWrapper } from './Expenses.styles';
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  Plus,
  Search,
} from 'tabler-icons-react';
import type { ExpensesHistory } from './Expenses';

interface ExpensesTableProps {
  columns: readonly Column<ExpensesHistory>[];
  data: readonly ExpensesHistory[];
  action?: () => void;
}

const ExpensesTable: FC<ExpensesTableProps> = ({
  columns,
  data,
  action = () => {},
}: ExpensesTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableWrapper>
      <div className='table-actions'>
        <TextInput
          icon={<Search size={15} />}
          size='xs'
          id='table-search'
          placeholder='Search Expense'
        />

        <Button id='add-expense' onClick={() => action()}>
          Add new expense
        </Button>
      </div>
      <ExpensesTableWrapper>
        <Table {...getTableProps()} fontSize={'xs'}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ExpensesTableWrapper>
      <hr />
      <div id='tbl-footer'>
        <p id='total-expenses'>
          Total Expense Items for May 2022: <span>150</span>
        </p>

        <div id='pagination'>
          <p>
            Page <span>10</span> of <span>15</span> &nbsp;
          </p>
          <div>
            <button>
              <ArrowNarrowLeft size={16} />
            </button>
            &nbsp;
            <button>
              <ArrowNarrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </TableWrapper>
  );
};

export default ExpensesTable;
