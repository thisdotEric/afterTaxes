import { createContext } from 'react';

export interface HeaderContextValue {
  headerTitle: string;
  date: Date;
}
interface HeaderContextProps {
  header: HeaderContextValue;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContextValue>>;
}

export const HeaderContext = createContext<HeaderContextProps>({
  header: {
    headerTitle: '',
    date: new Date(),
  },
  setHeader: () => {},
});
