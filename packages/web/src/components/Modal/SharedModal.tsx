import { Modal, ModalProps } from '@mantine/core';
import React, { FC } from 'react';
import { SharedModalWrapper } from './SharedModal.styles';

export interface RequiredModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
}

interface SharedModalProps extends ModalProps {
  children: React.ReactNode;
}

const SharedModal: FC<SharedModalProps> = (props: SharedModalProps) => {
  return (
    <SharedModalWrapper>
      <Modal
        {...props}
        classNames={{
          modal: 'input-modal',
          title: 'modal-title',
          body: 'input-modal',
          close: 'modal-close',
        }}
      >
        {props.children}
      </Modal>
    </SharedModalWrapper>
  );
};

export default SharedModal;
