import { createContext } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: true,
  setLoading: () => {},
});
