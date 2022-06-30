import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context';

export const useSetHeader = (
  headerTitle: string,
  tabTitle: string,
  date?: Date
) => {
  const { header, setHeader } = useContext(HeaderContext);

  useEffect(() => {
    document.title = `${tabTitle} | afterTaxes`;

    if (!date) date = new Date();

    setHeader({
      ...header,
      headerTitle,
      date,
    });
  }, []);
};
