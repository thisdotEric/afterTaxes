import { createContext } from 'react';
import type { ILoggedInUser } from '@aftertaxes/commons';

interface UserContextProps {
  user: ILoggedInUser;
  setUser: React.Dispatch<React.SetStateAction<ILoggedInUser>>;
}

export const UserInitialState: ILoggedInUser = {
  fullname: '',
  email: '',
};

export const UserContext = createContext<UserContextProps>({
  user: UserInitialState,
  setUser: () => {},
});
