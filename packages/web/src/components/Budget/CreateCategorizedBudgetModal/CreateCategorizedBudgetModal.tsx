import React, { FC, useState } from 'react';
import { CreateBudgetModalWrapper } from './CreateCategorizedBudgetModal.styles';
import SharedModal from '../../../components/Modal';
import { NumberInput, SelectInput, TextInput } from '../../../components/Input';
import type { RequiredModalProps } from '../../../components/Modal/SharedModal';
import { Button } from '../../../components/Button';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import { axios } from '../../../utils';
import type { CategorizedBudget } from '../../../pages/Budget';

interface CreateCategorizedBudgetModalProps extends RequiredModalProps {
  remainingBudget: number;
}

const CreateCategorizedBudgetModal: FC<CreateCategorizedBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  remainingBudget,
}: CreateCategorizedBudgetModalProps) => {
  const [categorized_budget, setBudget] = useState<
    Omit<CategorizedBudget, 'id'>
  >({
    budget: 0,
    category: 'FOOD',
    name: '',
  });

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
                categorized_budget,
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

            <SelectInput
              data={[
                { value: 'food', label: 'Food' },
                { value: 'tech', label: 'Tech' },
              ]}
            />

            <NumberInput
              label='Amount'
              value={categorized_budget.budget}
              error={
                categorized_budget.budget > remainingBudget &&
                `Budget has exceeded ${remainingBudget} limit.`
              }
              onChange={(value) =>
                setBudget({ ...categorized_budget, budget: value! })
              }
            />

            <TextInput
              label='Name'
              value={categorized_budget.name}
              onChange={(e) =>
                setBudget({ ...categorized_budget, name: e.target.value })
              }
            />

            <Button name='Create new Budget' />
          </form>
        </FormWrapper>
      </SharedModal>
    </CreateBudgetModalWrapper>
  );
};

export default CreateCategorizedBudgetModal;
