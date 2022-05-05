import { createContext } from 'react';
import type { IDate } from '../constants/date';

interface HeaderContextValue {
  header: string;
  date: IDate;
}

interface HeaderContextProps {
  header: HeaderContextValue | null;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContextValue | null>>;
}

export const HeaderContext = createContext<HeaderContextProps>({
  header: null,
  setHeader: () => {},
});
