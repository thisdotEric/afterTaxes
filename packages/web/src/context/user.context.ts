import { createContext } from 'react';
import type { ILoggedInUser } from '@aftertaxes/commons';

interface UserContextProps {
  user: ILoggedInUser | null;
  setUser: React.Dispatch<React.SetStateAction<ILoggedInUser | null>>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});
