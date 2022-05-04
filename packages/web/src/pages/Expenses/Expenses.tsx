import React, { FC, useMemo, useState } from 'react';
import './Expenses.css';
import { Date as DateComponent } from '../../components/Date';
import { month, year, day } from '../../constants/date';
import type { IDate } from '../../constants/date';
import { Modal, Table } from '@mantine/core';
import { useTable, Column } from 'react-table';
import {
  ExpensesPageWrapper,
  ExpensesTableWrapper,
  TableWrapper,
} from './Expenses.styles';
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  Edit,
  Trash,
} from 'tabler-icons-react';
import { green, red } from '../../components/styles/colors';
import { RecordExpensesModal } from './RecordExpenses';

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
  budgetType?: string;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  const [date, setDate] = useState<IDate>({
    month,
    day,
    year,
  });

  const [opened, setOpened] = useState(false);

  const data = useMemo<ExpensesHistory[]>(
    () => [
      {
        id: 1,
        date: '15th',
        name: 'Laptop Repair',
        description: 'Fixed laptop because windows sucks.',
        budgetType: 'Daily',
        amount: 100,
      },
      {
        id: 2,
        date: '15th',
        name: 'Laptop Repair and Grocery store',
        budgetType: 'Monthly',
        amount: 100,
      },
      {
        id: 3,
        date: '15th',
        name: 'I love interstellar movie will watch it again',
        budgetType: 'Transportation',
        amount: 100,
      },
      {
        id: 4,
        date: '1st',
        name: 'Laptop Repair',
        budgetType: 'Food',
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
        description:
          'Fixed laptop because windows sucks. I give you my world, ',
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
          Header: () => <p>DATE</p>,
          accessor: 'date',
        },
        {
          Header: () => <p>AMOUNT</p>,
          accessor: 'amount',
          Cell: (row) => (
            <p id='expense-amt'> &#x20B1;{row.value.toFixed(2)}</p>
          ),
        },
        {
          Header: () => <p>EXPENSE</p>,
          accessor: 'name',
        },
        {
          Header: () => <p>DESCRIPTION</p>,
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
          Cell: (row) => {
            return (
              <>
                <Edit stroke={green} size={20} /> &nbsp;
                <Trash stroke={red} size={20} />
              </>
            );
          },
        },
      ] as Column<ExpensesHistory>[],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <ExpensesPageWrapper>
      <DateComponent month={date.month} year={date.year} />

      <TableWrapper>
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

      <button onClick={() => setOpened(true)}>Add</button>
      <Modal
        opened={opened}
        classNames={{
          modal: 'input-modal',
          title: 'modal-title',
          body: 'input-modal',
          close: 'modal-close',
        }}
        onClose={() => setOpened(false)}
        title='Add new expense item'
      >
        <RecordExpensesModal setModalState={() => setOpened(false)} />
      </Modal>
    </ExpensesPageWrapper>
  );
};

export default Expenses;
