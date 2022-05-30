import { Modal } from '@mantine/core';
import React, { FC } from 'react';

interface AddBudgetModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBudgetModal: FC<AddBudgetModalProps> = ({
  opened,
  setOpened,
}: AddBudgetModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Introduce yourself!'
    >
      {/* Modal content */}
    </Modal>
  );
};

export default AddBudgetModal;
