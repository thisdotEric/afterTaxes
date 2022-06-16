import React, { FC, useEffect, useMemo, useState } from 'react';
import { axios } from '../../utils';
import { useSetHeader } from '../../hooks';
import { month, year } from '../../constants/date';
import { FundsHistoryWrapper } from './FundsHistory.styles';
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

  const [fundsHistory, setFundsHistory] = useState<IFundsHistory[]>([]);

  const fetchFundsHistory = async () => {
    const { data } = await axios.get('budgets/2022/06/history');

    console.log(data);

    setFundsHistory(
      data.map((h: any) => ({
        amount: h.amount,
        description: h.description,
        date: new Date(h.created_at),
      }))
    );
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
