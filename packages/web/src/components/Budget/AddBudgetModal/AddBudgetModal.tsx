import React, { FC } from 'react';
import './AddBudgetModal.css';
import { Modal } from '@mantine/core';
import { ModalWrapper } from './AddBudgetModal.styles';
import { primarybg } from '../../../components/styles/colors';
import { NumberInput, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { DeviceFloppy } from 'tabler-icons-react';
import axios from 'axios';

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
      title='Add new funds'
      styles={{
        modal: { backgroundColor: primarybg },
      }}
    >
      <ModalWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await axios.post('http://localhost:3000/api/v1/budgets', {
              budget: {
                amount: 100,
                description: 'Hey',
                created_at: '2022-10-12',
              },
            });
          }}
        >
          <NumberInput label='Additional Fund' />
          <TextArea label='Optional Description' />
          <Button name='Add new fund' />
        </form>
      </ModalWrapper>
    </Modal>
  );
};

export default AddBudgetModal;
