import React, { FC, useState } from 'react';
import './AddBudgetModal.css';
import { primarybg } from '../../../components/styles/colors';
import { NumberInput, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { axios } from '../../../utils';
import SharedModalWrapper from '../../../components/Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';

interface AddBudgetModalProps {
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
    <SharedModalWrapper
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
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await axios.post('budgets', {
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
      </FormWrapper>
    </SharedModalWrapper>
  );
};

export default AddBudgetModal;
