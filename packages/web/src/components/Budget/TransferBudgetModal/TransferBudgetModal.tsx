import SharedModal from '../../Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import React, { FC, useState } from 'react';
import type { RequiredModalProps } from '../../Modal/SharedModal';
import { NumberInput, SelectInput, TextInput } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmationTransfer } from './TransferBudgetModal.styles';
import { axios } from '../../../utils';
import type { SourceBudgetCategory } from '../../../pages/Budget';

export interface DestinationBudgets {
  label: string;
  value: string;
}

interface TransferBudgetModalProps extends RequiredModalProps {
  sourceBudget: SourceBudgetCategory;
  destinationBudgets: DestinationBudgets[];
}

const TransferBudgetModal: FC<TransferBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  destinationBudgets,
  sourceBudget: { remainingBudget, name, id },
}: TransferBudgetModalProps) => {
  const [amount, setAmount] = useState(0);
  const [destinationBudgetID, setDestinationBudgetID] = useState(0);
  const [label, setLabel] = useState('');

  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title='Transfer Budget'
    >
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await axios.patch('budgets/transfer', {
              from: id,
              to: destinationBudgetID,
              amount,
            });

            setOpened(false);
            await onSubmit();
          }}
        >
          <TextInput value={name} disabled label='From' />
          <NumberInput
            label={`${name} remaining budget`}
            value={remainingBudget}
            disabled
          />

          <SelectInput
            label='Transfer to'
            data={destinationBudgets}
            onChange={(value) => {
              setDestinationBudgetID(parseInt(value!));
              setLabel(
                destinationBudgets.filter((b) => b.value === value)[0].label
              );
            }}
          />

          <NumberInput
            label='Amount'
            value={amount}
            onChange={(value) => {
              if (value === undefined) setAmount(0);
              else setAmount(value!);
              console.log(value);
            }}
            max={remainingBudget}
          />

          <ConfirmationTransfer>
            <span>&#x20B1;{amount}</span> will be transferred to{' '}
            <span id='destination-budget'>{label} budget</span>.
          </ConfirmationTransfer>

          <Button name='Transfer budget' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default TransferBudgetModal;
