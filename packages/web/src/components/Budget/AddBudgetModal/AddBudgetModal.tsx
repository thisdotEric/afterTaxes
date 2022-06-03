import React, { FC, useEffect, useState } from 'react';
import './AddBudgetModal.css';
import { Modal } from '@mantine/core';
import { ModalWrapper } from './AddBudgetModal.styles';
import { primarybg } from '../../../components/styles/colors';
import { NumberInput, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';
import axios from 'axios';

interface AddBudgetModalProps {
  remainingBudget: number;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
}

const AddBudgetModal: FC<AddBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
}: AddBudgetModalProps) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(true);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setAmount(0);
        setDescription('');
        setOpened(false);
      }}
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
                amount,
                description,
                created_at: new Date(),
              },
            });

            await onSubmit();
            setOpened(false);
          }}
        >
          <NumberInput
            label='Additional Fund'
            value={amount}
            onChange={(value) => {
              if (value! <= 0) setDisabled(true);
              else {
                setDisabled(false);
                setAmount(value!);
              }
            }}
          />

          <TextArea
            label='Optional Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button name='Add new fund' disable={disabled} />
        </form>
      </ModalWrapper>
    </Modal>
  );
};

export default AddBudgetModal;
