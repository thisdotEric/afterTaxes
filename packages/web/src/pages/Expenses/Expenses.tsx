import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import './Expenses.css';
import { Button, Menu, Modal } from '@mantine/core';
import { ExpensesPageWrapper } from './Expenses.styles';
import { RecordExpensesModal } from './RecordExpenses';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notification';
import { HeaderContext } from '../../context';
import { expensesColumns } from './expenses.columns';
import ExpensesTable from './ExpensesTable';
import { useSetHeader } from '../../hooks';
import { year, month } from '../../constants/date';
import { SelectInput } from '../../components/Input';
import type { Column } from 'react-table';
import {
  ChevronDown,
  Dots,
  Edit,
  ExternalLink,
  Trash,
} from 'tabler-icons-react';

interface ExpensesProps {}

export interface ExpensesHistory {
  id: number;
  date: Date | string;
  name: string;
  description?: string;
  amount: number;
  budgetType: string;
}

interface ActionList {
  value: string;
  label: string;
  icon: JSX.Element;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  useSetHeader('Expenses List', 'Expenses', { year, month });

  // Modal state variables
  const [opened, setOpened] = useState(false);
  const [openedEditModal, setOpenedEditModal] = useState(false);
  const [openedConfirmDeleteModal, setOpenedConfirmDeleteModal] =
    useState(false);

  const [rows, setRows] = useState<ExpensesHistory[]>([]);
  const [actions] = useState<ActionList[]>([
    {
      value: 'edit',
      label: 'Edit',
      icon: <Edit size={14} />,
    },
    {
      value: 'delete',
      label: 'Delete',
      icon: <Trash size={14} />,
    },
  ]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/v1/expenses/2022/Jan');
    const data = await res.json();

    setRows(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memoized table rows and columns
  const data = useMemo<ExpensesHistory[]>(() => rows, [rows, setRows]);

  const columns = useMemo(
    () =>
      [
        ...expensesColumns,
        {
          Header: 'ACTIONS',
          accessor: 'id',
          Cell: (row) => {
            return (
              <Menu
                withArrow
                control={
                  <Button
                    size='xs'
                    id='action-btn'
                    rightIcon={<ChevronDown size={12} />}
                  >
                    Action
                  </Button>
                }
              >
                {actions.map(({ value, label, icon }) => (
                  <Menu.Item
                    icon={icon}
                    onClick={async () => {
                      console.log(value, row.value);

                      await fetchData();
                    }}
                  >
                    {label}
                  </Menu.Item>
                ))}
              </Menu>
            );
          },
        },
      ] as Column<ExpensesHistory>[],
    []
  );

  return (
    <ExpensesPageWrapper>
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
          }}
        />
      </Modal>
    </ExpensesPageWrapper>
  );
};

export default Expenses;
