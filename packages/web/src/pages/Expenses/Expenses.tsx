import React, { FC, useMemo, useState } from 'react';
import { Date as DateComponent } from '../../components/Date';
import { month, year, day } from '../../constants/date';
import type { IDate } from '../../constants/date';
import { Table, Pagination, Notification } from '@mantine/core';
import { useTable, Column } from 'react-table';
import { ExpensesTableWrapper } from './Expenses.styles';
import { ArrowsSort, Trash } from 'tabler-icons-react';
import { red } from '../../components/styles/colors';

interface ExpensesProps {}

interface DummyData {
  id: number;
  name: string;
  comp?: any;
}

interface ExpensesHistory {
  id: number;
  date: Date | string;
  name: string;
  description?: string;
  amount: number;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  const [date, setDate] = useState<IDate>({
    month,
    day,
    year,
  });

  const data = useMemo<ExpensesHistory[]>(
    () => [
      {
        id: 1,
        date: '15th',
        name: 'Laptop Repair',
        description: 'Fixed laptop because windows sucks.',
        amount: 100,
      },
      {
        id: 2,
        date: '15th',
        name: 'Laptop Repair and Grocery store',
        amount: 100,
      },
      {
        id: 3,
        date: '15th',
        name: 'I love interstellar movie will watch it again',
        amount: 100,
      },
      {
        id: 4,
        date: '15th',
        name: 'Laptop Repair',
        amount: 100,
      },
      {
        id: 5,
        date: '15th',
        name: 'Laptop Repair',
        amount: 100.5,
      },
      {
        id: 6,
        date: '15th',
        name: 'Laptop Repair',
        amount: 100,
      },
      {
        id: 7,
        date: '15th',
        name: 'Laptop Repair',
        amount: 100,
      },

      {
        id: 6,
        date: '15th',
        name: 'Laptop Repair',
        amount: 100,
      },
    ],
    []
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: () => (
            <p>
              Date &nbsp;
              <span>
                <ArrowsSort
                  stroke='white'
                  size={15}
                  onClick={() => alert('asdfj')}
                />
              </span>
            </p>
          ),
          accessor: 'date',
        },
        {
          Header: () => (
            <p>
              Amount &nbsp;
              <span>
                <ArrowsSort
                  stroke='white'
                  size={15}
                  onClick={() => alert('asdfj')}
                />
              </span>
            </p>
          ),
          accessor: 'amount',
          Cell: (row) => <strong>{row.value}</strong>,
        },
        {
          Header: () => (
            <p>
              Name &nbsp;
              <span>
                <ArrowsSort
                  stroke='white'
                  size={15}
                  onClick={() => alert('asdfj')}
                />
              </span>
            </p>
          ),
          accessor: 'name',
        },
        {
          Header: () => (
            <p>
              Description &nbsp;
              <span>
                <ArrowsSort
                  stroke='white'
                  size={15}
                  onClick={() => alert('asdfj')}
                />
              </span>
            </p>
          ),
          accessor: 'description',
        },

        {
          Header: 'Action',
          accessor: 'id',
          Cell: (row) => {
            return <Trash stroke={red} size={20} />;
          },
        },
      ] as Column<ExpensesHistory>[],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <DateComponent month={date.month} year={date.year} />

      <ExpensesTableWrapper>
        <Table
          {...getTableProps()}
          fontSize={'xs'}
          verticalSpacing={'sm'}
          sx={(theme) => ({
            backgroundColor: 'transparent',
            border: 'none',
          })}
        >
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
    </div>
  );
};

export default Expenses;
