import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Menu, Modal } from '@mantine/core';
import { ExpensesPageWrapper } from './Expenses.styles';
import { RecordExpensesModal } from '../../components/Expenses/RecordExpenses';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notification';
import { expensesColumns } from './expenses.columns';
import { useSetHeader } from '../../hooks';
import { year, month } from '../../constants/date';
import type { Column } from 'react-table';
import { ChevronDown, Edit, Trash } from 'tabler-icons-react';
import { axios } from '../../utils';
import TableComponent from '../../components/Table';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import type { ActionList } from '../../components/Menu/ActionMenu';
import ActionMenu from '../../components/Menu/ActionMenu';

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

export interface CurrentRow {
  id: number;
  budgetName: string;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  useSetHeader('Expenses List', 'Expenses', { year, month });

  // Modal state variables
  const [opened, setOpened] = useState(false);
  const [openedConfirmDeleteModal, setOpenedConfirmDeleteModal] =
    useState(false);
  const [currentRow, setCurrentRow] = useState<CurrentRow>({
    id: 0,
    budgetName: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  const [rows, setRows] = useState<ExpensesHistory[]>([]);
  const [actions] = useState<ActionList[]>([
    {
      value: 'edit',
      label: 'Edit',
      icon: <Edit size={13} />,
      action: (row) => {
        setCurrentRow(row);
        setIsEdit(true);
        setOpened(true);
      },
    },
    {
      value: 'delete',
      label: 'Delete',
      isDanger: true,
      icon: <Trash size={13} />,
      action: (row) => {
        setCurrentRow(row);
        setOpenedConfirmDeleteModal(true);
      },
    },
  ]);

  const fetchData = async () => {
    const { data } = await axios.get('expenses/2022/06');
    setRows(data);
  };

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
              <ActionMenu
                actions={actions}
                currentRow={{
                  id: row.value,
                  budgetName: row.row.original.budgetName,
                }}
              />
            );
          },
        },
      ] as Column<ExpensesHistory>[],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

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
        setIsEdit={setIsEdit}
        actionType={
          isEdit
            ? {
                type: 'update',
                currentRow: {
                  id: currentRow.id,
                  budgetName: currentRow.budgetName,
                },
              }
            : {
                type: 'add',
              }
        }
        onSubmit={async () => {
          setIsEdit(false);
          await fetchData();

          setTimeout(() => {
            if (isEdit)
              showNotification(
                getNotificationProps('One item updated', 'success')
              );
            else
              showNotification(
                getNotificationProps('New expense item added', 'success')
              );
          }, 10);
        }}
      />

      <ConfirmModal
        opened={openedConfirmDeleteModal}
        setOpened={setOpenedConfirmDeleteModal}
        onSubmit={async () => {
          await axios.delete(`expenses/${currentRow.id}`);

          await fetchData();
        }}
        modalTitle='Confirm delete expense item?'
        confirmMessage='Delete'
      />
    </ExpensesPageWrapper>
  );
};

export default Expenses;
