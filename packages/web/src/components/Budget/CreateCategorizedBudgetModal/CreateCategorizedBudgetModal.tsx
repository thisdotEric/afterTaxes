import React, { FC, useCallback, useEffect, useState } from 'react';
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

interface InputData {
  label: string;
  value: string;
}

const defaultState: Omit<CategorizedBudget, 'id'> = {
  budget: 0,
  category: 'FOOD',
  name: '',
};

const CreateCategorizedBudgetModal: FC<CreateCategorizedBudgetModalProps> = ({
  opened,
  setOpened,
  onSubmit,
  remainingBudget,
}: CreateCategorizedBudgetModalProps) => {
  const [categorized_budget, setBudget] =
    useState<Omit<CategorizedBudget, 'id'>>(defaultState);

  const [budgetCategories, setBudgetCategories] = useState<InputData[]>([]);

  const fetchBudgetTypes = async () => {
    const { data } = await axios.get('budgets/categories');

    setBudgetCategories(() => {
      return data.map((c: any) => ({
        value: c.budget_type_id,
        label: c.type,
      }));
    });
  };

  useEffect(() => {
    fetchBudgetTypes();
  }, []);

  return (
    <CreateBudgetModalWrapper>
      <SharedModal
        opened={opened}
        onClose={() => {
          setBudget(defaultState);
          setOpened(false);
        }}
        title='Create a categorized budget'
      >
        <FormWrapper>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              console.log(categorized_budget);

              await axios.post('budgets/categorized-budget', {
                categorized_budget,
              });

              await onSubmit();
              setBudget(defaultState);
              setOpened(false);
            }}
          >
            <NumberInput
              label='Remaining Budget'
              value={remainingBudget}
              disabled
            />

            <SelectInput
              data={budgetCategories}
              onChange={(value) =>
                setBudget({ ...categorized_budget, category: value! })
              }
            />

            <NumberInput
              label='Amount'
              value={categorized_budget.budget}
              error={
                categorized_budget.budget > remainingBudget
                  ? `Budget has exceeded ${remainingBudget} limit.`
                  : ''
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
