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
    description: 'Fixed laptop because windows sucks.',
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
  const [opened, setOpened] = useState(false);
  const [rows, setRows] = useState<ExpensesHistory[]>([]);
  const [refetch, setRefetch] = useState<number>(0);

  const addData = (): ExpensesHistory[] => {
    setRows([
      ...rows,
      {
        amount: Math.random(),
        budgetType: 'Tech',
        date: '23',
        id: 1,
        name: 'Spotify Premium',
        description: '3 month subscription',
      },
    ]);

    return rows;
  };

  const { header, setHeader } = useContext(HeaderContext);

  const fetchExpensesRows = async () => {
    const res = await fetch('http://localhost:3000/api/v1/expenses/2022/Jan');
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    setHeader({
      ...header,
      headerTitle: 'Expenses List',
    });

    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/v1/expenses/2022/Jan');
      const data = await res.json();

      setRows(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHeader({
      ...header,
      headerTitle: 'Expenses List',
    });

    setRows(addData());
  }, [refetch]);

  // Memoized table rows and columns
  const data = useMemo<ExpensesHistory[]>(() => addData(), [refetch]);
  const columns = useMemo(() => expensesColumns, []);

  return (
    <ExpensesPageWrapper>
      {/* Expenses list table */}

      {rows && <ExpensesTable columns={columns} data={data} />}

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
