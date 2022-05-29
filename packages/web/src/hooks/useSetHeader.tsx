import type { IDate } from '../constants/date';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context';

export const useSetHeader = (headerTitle: string, date?: IDate) => {
  const { header, setHeader } = useContext(HeaderContext);

  useEffect(() => {
    setHeader({
      ...header,
      headerTitle,
      date,
    });
  }, []);
};
