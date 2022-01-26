import { createContext } from 'react';

export type PopUpType = 'error' | 'success';

export interface IPopUp {
  message: string;
  type: PopUpType;
  show: boolean;
}

interface UserContextProps {
  popUp: IPopUp | null;
  setPopUp: React.Dispatch<React.SetStateAction<IPopUp | null>>;
}

export const PopUpContext = createContext<UserContextProps>({
  popUp: null,
  setPopUp: () => {},
});
