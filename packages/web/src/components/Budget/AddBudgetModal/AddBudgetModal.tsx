import React, { FC, useState } from 'react';
import './AddBudgetModal.css';
import { primarybg } from '../../../components/styles/colors';
import { NumberInput, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { axios } from '../../../utils';
import SharedModalWrapper from '../../../components/Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import type { FundsOperation } from '../../../pages/Budget';

interface AddBudgetModalProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  fundsOperation: FundsOperation;
  remainingBudget?: number;
}

const AddBudgetModal: FC<AddBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  fundsOperation,
  remainingBudget,
}: AddBudgetModalProps) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const clearStates = () => {
    setAmount(0);
    setDescription('');
  };

  return (
    <SharedModalWrapper
      opened={opened}
      onClose={() => {
        clearStates();
        setOpened(false);
      }}
      title={fundsOperation === 'add' ? 'Add new funds' : 'Remove funds'}
      styles={{
        modal: { backgroundColor: primarybg },
      }}
    >
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const fundsAmount = fundsOperation === 'add' ? amount : amount * -1;

            await axios.post('budgets', {
              budget: {
                amount: fundsAmount,
                description,
                created_at: new Date(),
              },
            });

            clearStates();
            setOpened(false);
            await onSubmit();
          }}
        >
          {fundsOperation === 'remove' && (
            <NumberInput
              label='Remaining Funds'
              value={remainingBudget!}
              disabled
            />
          )}

          <NumberInput
            label={
              fundsOperation === 'add'
                ? 'Additional Fund'
                : 'Amount to be removed'
            }
            value={amount}
            onChange={(value) => {
              setAmount(value!);
            }}
          />
          <TextArea
            label='Optional Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            name={fundsOperation === 'add' ? 'Add new fund' : 'Remove fund'}
            submitType={fundsOperation === 'remove' ? 'delete' : 'save'}
          />
        </form>
      </FormWrapper>
    </SharedModalWrapper>
  );
};

export default AddBudgetModal;
