import React, { FC, useState } from 'react';
import { CreateBudgetModalWrapper } from './CreateCategorizedBudgetModal.styles';
import SharedModal from '../../../components/Modal';
import { NumberInput, TextInput } from '../../../components/Input';
import type { RequiredModalProps } from '../../../components/Modal/SharedModal';
import { Button } from '../../../components/Button';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import { axios } from '../../../utils';

interface CreateCategorizedBudgetModalProps extends RequiredModalProps {
  remainingBudget: number;
}

const CreateCategorizedBudgetModal: FC<CreateCategorizedBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  remainingBudget,
}: CreateCategorizedBudgetModalProps) => {
  return (
    <CreateBudgetModalWrapper>
      <SharedModal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title='Create a categorized budget'
      >
        <FormWrapper>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await axios.post('budgets/categorized-budget', {
                categorized_budget: {
                  budget: 6000.5,
                  name: 'Tuition Fee',
                  category: 'TUITION_CONTRIBUTION',
                },
              });

              await onSubmit();
              setOpened(false);
            }}
          >
            <NumberInput
              label='Remaining Budget'
              value={remainingBudget}
              disabled
            />
            <NumberInput label='Amount' value={15} />
            <TextInput label='Name' value='' />

            <Button name='Create new Budget' />
          </form>
        </FormWrapper>
      </SharedModal>
    </CreateBudgetModalWrapper>
  );
};

export default CreateCategorizedBudgetModal;
