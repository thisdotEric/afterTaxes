import { createContext } from 'react';
import type { IDate } from '../constants/date';

export interface HeaderContextValue {
  headerTitle: string;
  date?: IDate;
}
interface HeaderContextProps {
  header: HeaderContextValue | null;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContextValue>>;
}

export const HeaderContext = createContext<HeaderContextProps>({
  header: null,
  setHeader: () => {},
});
