import SharedModal from '../../Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import React, { FC, useEffect, useState } from 'react';
import type { RequiredModalProps } from '../../Modal/SharedModal';
import { NumberInput, SelectInput, TextInput } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { ConfirmationTransfer } from './TransferBudgetModal.styles';
import { axios } from '../../../utils';

interface TransferBudgetModalProps extends RequiredModalProps {
  fromBudgetName: string;
  fromBudgetId: number;
  remainingBudget: number;
}

interface ITransferBudget {
  from: number;
  to: number;
  amount: number;
  fromLabel?: string;
  toLabel?: string;
}

const TransferBudgetModal: FC<TransferBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  fromBudgetName,
  remainingBudget,
  fromBudgetId,
}: TransferBudgetModalProps) => {
  const [transferBudget, setTransferBudget] = useState<ITransferBudget>({
    from: fromBudgetId,
    to: 0,
    amount: 0,
  });

  const fetchDestinationBudgets = async () => {
    // const { data: categorized_budget } = await axios.get(
    //   'budgets/2022/06/categories'
    // );
    // console.log(categorized_budget);
  };

  useEffect(() => {
    fetchDestinationBudgets();
  }, []);

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

            console.log(transferBudget);

            // await onSubmit();
          }}
        >
          <TextInput value={fromBudgetName} disabled label='From' />
          <NumberInput
            label={`${fromBudgetName} remaining budget`}
            value={remainingBudget}
            disabled
          />

          <SelectInput
            label='Transfer to'
            data={[
              {
                label: 'Crypto',
                value: '1',
              },
              {
                label: 'Food',
                value: '2',
              },
            ]}
            onChange={(value: any) => {
              console.log(value);
            }}
          />

          <NumberInput
            label='Amount'
            value={remainingBudget}
            onChange={(value) => {
              setTransferBudget({ ...transferBudget, amount: value! });
            }}
            max={remainingBudget}
          />

          <ConfirmationTransfer>
            <span>P30.55</span> will be transferred to{' '}
            <span id='destination-budget'>Lunch budget</span>.
          </ConfirmationTransfer>

          <Button name='Transfer budget' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default TransferBudgetModal;
