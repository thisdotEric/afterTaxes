import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Button, Menu, Modal } from '@mantine/core';
import { ExpensesPageWrapper } from './Expenses.styles';
import { RecordExpensesModal } from './RecordExpenses';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notification';
import { expensesColumns } from './expenses.columns';
import { useSetHeader } from '../../hooks';
import { year, month } from '../../constants/date';
import type { Column } from 'react-table';
import { ChevronDown, Edit, Trash } from 'tabler-icons-react';
import { axios } from '../../utils';
import TableComponent from '../../components/Table';

interface ExpensesProps {}

export interface ExpensesHistory {
  id: number;
  date: Date;
  name: string;
  description?: string;
  amount: number;
  budget_id: string;
  budgetName: string;
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
    const { data } = await axios.get('expenses/2022/06');

    console.log(data);

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
          disableSortBy: true,
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
        <TableComponent
          columns={columns}
          data={data}
          action={{
            name: 'Add new expense',
            event: () => setOpened(true),
          }}
        />
      )}

      <RecordExpensesModal
        opened={opened}
        setOpened={setOpened}
        onSubmit={async () => {
          await fetchData();

          setTimeout(() => {
            showNotification(
              getNotificationProps('New expense item added', 'success')
            );
          }, 100);
        }}
      />
    </ExpensesPageWrapper>
  );
};

export default Expenses;
