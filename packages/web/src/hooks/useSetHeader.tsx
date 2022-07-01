import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context';

export const useSetHeader = (headerTitle: string, tabTitle: string) => {
  const { setHeader } = useContext(HeaderContext);

  useEffect(() => {
    document.title = `${tabTitle} | afterTaxes`;

    setHeader((old) => ({
      ...old,
      headerTitle,
    }));
  }, []);
};
