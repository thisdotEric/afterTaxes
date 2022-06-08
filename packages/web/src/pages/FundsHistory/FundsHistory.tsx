import React, { FC, useEffect, useMemo, useState } from 'react';
import { Timeline, Text, Card } from '@mantine/core';
import { Minus, Plug, Plus, SpacingHorizontal } from 'tabler-icons-react';
import { axios } from '../../utils';
import { useSetHeader } from '../../hooks';
import { month, year } from '../../constants/date';
import { FundsHistoryWrapper } from './FundsHistory.styles';
import { PlusCircle } from 'react-feather';
import TableComponent from '../../components/Table';
import type { Column } from 'react-table';

export interface IFundsHistory {
  amount: number;
  description: string;
  date: Date;
}

interface FundsHistoryProps {}

const FundsHistory: FC<FundsHistoryProps> = ({}: FundsHistoryProps) => {
  useSetHeader('Funds History', 'Funds History', { month, year });

  const [fundsHistory, setFundsHistory] = useState<IFundsHistory[]>([
    {
      amount: 12,
      date: new Date(),
      description: 'sdfbsdf',
    },
    {
      amount: 20.23,
      date: new Date(),
      description: 'Galing sa utang',
    },
    {
      amount: 200,
      date: new Date(),
      description: 'sdfbsdf',
    },
    {
      amount: 20.23,
      date: new Date(),
      description: 'Galing sa utang',
    },
    {
      amount: 200,
      date: new Date(),
      description: 'sdfbsdf',
    },
    {
      amount: -20.23,
      date: new Date(),
      description: 'Galing sa utang',
    },
    {
      amount: 200,
      date: new Date(),
      description: 'sdfbsdf',
    },
    {
      amount: 2,
      date: new Date(),
      description: 'Galing sa utang',
    },
    {
      amount: 95.22,
      date: new Date(),
      description: 'sdfbsdf',
    },
    {
      amount: 20.23,
      date: new Date(),
      description: 'Galing sa utang',
    },
  ]);

  const fetchFundsHistory = async () => {
    const { data } = await axios.get('budgets/2022/06/history');

    console.log(data);
  };

  const columns = useMemo(
    () =>
      [
        {
          Header: 'DATE',
          accessor: 'date',
          Cell: (row) => <p>{row.value.toDateString()}</p>,
        },
        {
          Header: 'AMOUNT',
          accessor: 'amount',
          Cell: (row) => (
            <p>
              {row.value < 0 ? (
                <span id='down'>{row.value.toFixed(2)}</span>
              ) : (
                <span id='up'>+{row.value.toFixed(2)}</span>
              )}
            </p>
          ),
        },
        {
          Header: 'DESCRIPTION',
          accessor: 'description',
        },
      ] as Column<IFundsHistory>[],
    []
  );

  const data = useMemo(() => fundsHistory, [fundsHistory]);

  useEffect(() => {
    fetchFundsHistory();
  }, []);

  return (
    <FundsHistoryWrapper>
      <TableComponent data={data} columns={columns} />
    </FundsHistoryWrapper>
  );
};

export default FundsHistory;
