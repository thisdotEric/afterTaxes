import React, { FC, useContext } from 'react';
import { PopUpWrapper } from './PopUp.styles';
import { XCircle } from 'react-feather';
import { PopUpContext } from '../../context';

interface PopUpProps {}

const PopUp: FC<PopUpProps> = ({}: PopUpProps) => {
  const { popUp, setPopUp } = useContext(PopUpContext);

  return (
    <>
      {popUp?.show && (
        <PopUpWrapper
          onClick={() => {
            setPopUp({ message: '', type: 'success', show: false });
          }}
        >
          <p>{popUp?.message}</p>
          <XCircle id='close' />
        </PopUpWrapper>
      )}
    </>
  );
};

export default PopUp;
