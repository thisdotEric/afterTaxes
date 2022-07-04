import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { axios } from '../../utils';
import { useSetHeader } from '../../hooks';
import { FundsHistoryWrapper } from './FundsHistory.styles';
import TableComponent from '../../components/Table';
import type { Column } from 'react-table';
import { HeaderContext } from '../../context';
import { getMonthAndYear } from '../../utils/date';

export interface IFundsHistory {
  amount: number;
  description: string;
  date: Date;
}

interface FundsHistoryProps {}

const FundsHistory: FC<FundsHistoryProps> = ({}: FundsHistoryProps) => {
  useSetHeader('Funds History', 'Funds History');
  const {
    header: { date },
  } = useContext(HeaderContext);

  const [fundsHistory, setFundsHistory] = useState<IFundsHistory[]>([]);

  const fetchFundsHistory = async () => {
    const { month, year } = getMonthAndYear(date);
    const { data } = await axios.get(`budgets/${year}/${month}/history`);

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
