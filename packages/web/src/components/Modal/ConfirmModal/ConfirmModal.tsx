import React, { FC } from 'react';
import SharedModal, { RequiredModalProps } from '../SharedModal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import { Button } from '../../../components/Button';

interface ConfirmModalProps extends RequiredModalProps {
  modalTitle: string;
  confirmMessage: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onSubmit,
  setOpened,
  opened,
  modalTitle,
  confirmMessage,
}: ConfirmModalProps) => {
  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title={modalTitle}
    >
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setOpened(false);
            await onSubmit();
          }}
        >
          <Button name={confirmMessage} submitType='delete' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default ConfirmModal;
