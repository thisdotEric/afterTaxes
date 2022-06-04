import type { IDate } from '../constants/date';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context';
import { month, day, year } from '../constants/date';

export const useSetHeader = (headerTitle: string, date?: IDate) => {
  const { header, setHeader } = useContext(HeaderContext);

  useEffect(() => {
    if (!date)
      date = {
        month,
        day,
        year,
      };

    setHeader({
      ...header,
      headerTitle,
      date,
    });
  }, []);
};
