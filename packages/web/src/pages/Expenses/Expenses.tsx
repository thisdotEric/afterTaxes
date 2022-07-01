import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ExpensesLegends,
  ExpensesPageWrapper,
  TotalExpenses,
} from './Expenses.styles';
import { RecordExpensesModal } from '../../components/Expenses/RecordExpenses';
import { showNotification } from '@mantine/notifications';
import { getNotificationProps } from '../../components/Notification';
import { expensesColumns } from './expenses.columns';
import { useSetHeader } from '../../hooks';
import type { Column } from 'react-table';
import { Edit, Trash } from 'tabler-icons-react';
import { axios } from '../../utils';
import TableComponent from '../../components/Table';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import type { ActionList } from '../../components/Menu/ActionMenu';
import ActionMenu from '../../components/Menu/ActionMenu';
import { HeaderContext } from '../../context';
import { getMonthAndYear } from '../../utils/date';

interface ExpensesProps {}

export interface ExpensesHistory {
  id: number;
  date: Date;
  name: string;
  description?: string;
  amount: number;
  budget_id: string;
  budgetName: string;
  originatingBudgetDeleted?: boolean;
}

export interface CurrentRow {
  id: number;
  budgetName: string;
  originatingBudgetDeleted?: boolean;
}

const Expenses: FC<ExpensesProps> = ({}: ExpensesProps) => {
  useSetHeader('Expenses List', 'Expenses');
  const {
    header: { date },
  } = useContext(HeaderContext);

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
        if (row) setCurrentRow(row);

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
        if (row) setCurrentRow(row);

        setOpenedConfirmDeleteModal(true);
      },
    },
  ]);

  const fetchData = useCallback(async () => {
    const { month, year } = getMonthAndYear(date);

    const { data } = await axios.get(`expenses/${year}/${month}`);
    setRows(data);
  }, [date]);

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
                  originatingBudgetDeleted:
                    row.row.original.originatingBudgetDeleted,
                }}
              />
            );
          },
        },
      ] as Column<ExpensesHistory>[],
    []
  );

  const totalExpenses = useMemo(() => {
    return rows.reduce((prev, next) => {
      return prev + next.amount;
    }, 0);
  }, [rows]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, [date]);

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
          leftHandTableInfo={
            <TotalExpenses>
              Total Expenses: <span>{totalExpenses.toFixed(2)}</span>
            </TotalExpenses>
          }
          legends={
            <ExpensesLegends>
              <p>
                Legends:{' '}
                <span id='legend-description'>Originating budget deleted</span>
                <span>*</span>
              </p>
            </ExpensesLegends>
          }
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
                  originatingBudgetDeleted: currentRow.originatingBudgetDeleted,
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
            showNotification(
              getNotificationProps(
                `${isEdit ? 'One item updated' : 'New expense item added'}`,
                'success'
              )
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
