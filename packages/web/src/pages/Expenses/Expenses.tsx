import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import './Expenses.css';
import { Modal } from '@mantine/core';
import { ExpensesPageWrapper } from './Expenses.styles';
import { RecordExpensesModal } from './RecordExpenses';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notification';
import { HeaderContext } from '../../context';
import { expensesColumns } from './expenses.columns';
import ExpensesTable from './ExpensesTable';
import { useSetHeader } from '../../hooks';
import { year, month } from '../../constants/date';

interface ExpensesProps {}

export interface ExpensesHistory {
  id: number;
  date: Date | string;
  name: string;
  description?: string;
  amount: number;
  budgetType: string;
}

const dummy = [
  {
    id: 1,
    date: '15',
    name: 'Laptop Repair',
    description: 'Fixed laptop because windows sucks. Then fixed ',
    budgetType: 'Daily',
    amount: 100,
  },
  {
    id: 2,
    date: '15',
    name: 'Laptop Repair and Grocery store',
    budgetType: 'Monthly',
    amount: 100,
  },
  {
    id: 3,
    date: '15',
    name: 'I love interstellar movie will watch it again',
    budgetType: 'Transportation',
    amount: 100,
  },
];

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  useSetHeader('Expenses List', { year, month });

  const [opened, setOpened] = useState(false);
  const [rows, setRows] = useState<ExpensesHistory[]>(dummy);
  const [refetch, setRefetch] = useState<number>(0);

  const addData = () => {
    setRows((old) => {
      return [
        ...old,
        {
          amount: Math.random(),
          budgetType: 'Tech',
          date: '23',
          id: 1,
          name: 'Spotify Premium',
          description: '3 month subscription',
        },
      ];
    });
  };

  const fetchExpensesRows = async () => {
    const res = await fetch('http://localhost:3000/api/v1/expenses/2022/Jan');
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/v1/expenses/2022/Jan');
      const data = await res.json();

      setRows(dummy);
    };

    fetchData();
  }, []);

  useEffect(() => {
    addData();
  }, [refetch]);

  // Memoized table rows and columns
  const data = useMemo<ExpensesHistory[]>(() => rows, [rows]);
  const columns = useMemo(() => expensesColumns, []);

  return (
    <ExpensesPageWrapper>
      {/* Expenses list table */}

      {rows && (
        <ExpensesTable
          columns={columns}
          data={data}
          action={() => setOpened(true)}
        />
      )}

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
        <RecordExpensesModal
          setModalState={() => {
            setOpened(false);

            setTimeout(() => {
              showNotification(
                getNotificationProps('New expense item added', 'success')
              );
            }, 100);

            setRefetch(Math.random());
            console.log(refetch);
          }}
        />
      </Modal>
    </ExpensesPageWrapper>
  );
};

export default Expenses;
