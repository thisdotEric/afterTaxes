import React, { FC } from 'react';
import SharedModal, { RequiredModalProps } from '../SharedModal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import { Button } from '../../../components/Button';
import { OptionalNote } from './ConfirmModal.styles';

interface ConfirmModalProps extends RequiredModalProps {
  modalTitle: string;
  confirmMessage: string;
  optionalNote?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onSubmit,
  setOpened,
  opened,
  modalTitle,
  confirmMessage,
  optionalNote,
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
          {optionalNote && <OptionalNote>***{optionalNote}***</OptionalNote>}
          <Button name={confirmMessage} submitType='delete' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default ConfirmModal;
