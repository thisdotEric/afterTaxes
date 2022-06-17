import SharedModal from '../../Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import React, { FC, useCallback, useState } from 'react';
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

  const [amountError, setAmountError] = useState('');
  const [budgetTypeError, setBudgetTypeError] = useState('');

  const allValuesFilled = (currentAmount: number, currentRemaining: number) => {
    if (destinationBudgetID == 0) {
      setBudgetTypeError('No destination budget selected.');
      return false;
    }

    if (currentAmount == 0) {
      setAmountError('Transfer budget should not be zero.');
      return false;
    }

    if (currentAmount > currentRemaining) {
      setAmountError(
        `Limit amount of ${currentRemaining.toFixed(2)} exceeded.`
      );
      return false;
    }

    return true;
  };

  const clearStates = () => {
    setAmount(0);
    setDestinationBudgetID(0);
    setBudgetTypeError('');
    setAmountError('');
  };

  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        clearStates();
        setOpened(false);
      }}
      title='Transfer Budget'
    >
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (allValuesFilled(amount, remainingBudget)) {
              await axios.patch('budgets/transfer', {
                from: id,
                to: destinationBudgetID,
                amount,
              });

              clearStates();
              setOpened(false);
              await onSubmit();
            }
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
            error={budgetTypeError}
            onChange={(value) => {
              setDestinationBudgetID(parseInt(value!));
              setLabel(
                destinationBudgets.filter((b) => b.value === value)[0].label
              );
              setBudgetTypeError('');
            }}
          />

          <NumberInput
            label='Amount'
            value={amount}
            onChange={(value) => {
              if (value === undefined) setAmount(0);
              else {
                if (value! > remainingBudget) {
                  setAmountError(
                    `Limit amount of ${remainingBudget.toFixed(
                      2
                    )} exceeded. Will default to ${remainingBudget.toFixed(2)}`
                  );
                } else {
                  setAmount(value!);
                  setAmountError('');
                }
              }
            }}
            error={amountError}
            max={remainingBudget}
          />

          <ConfirmationTransfer>
            <span>&#x20B1;{amountError !== '' ? '0' : amount}</span> will be
            transferred to <span id='destination-budget'>{label} budget</span>.
          </ConfirmationTransfer>

          <Button name='Transfer budget' submitType='transfer' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default TransferBudgetModal;
