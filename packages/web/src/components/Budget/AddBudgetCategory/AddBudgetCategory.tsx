import React, { FC, useState } from 'react';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import SharedModal from '../../../components/Modal';
import type { RequiredModalProps } from '../../../components/Modal/SharedModal';
import { primarybg } from '../../../components/styles/colors';
import { TextArea, TextInput } from '../../../components/Input';
import { Button } from '../../../components/Button';

interface AddBudgetCategoryProps extends RequiredModalProps {}

interface BudgetType {
  name: string;
  description: string;
}

const initialState: BudgetType = {
  name: '',
  description: '',
};

const AddBudgetCategory: FC<AddBudgetCategoryProps> = ({
  opened,
  setOpened,
  onSubmit,
}: AddBudgetCategoryProps) => {
  const [budgetType, setBudgetType] = useState<BudgetType>(initialState);

  const clearStates = () => {
    setBudgetType(initialState);
  };

  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        clearStates();
        setOpened(false);
      }}
      title='Add budget categories'
      styles={{
        modal: { backgroundColor: primarybg },
      }}
    >
      <FormWrapper>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            console.log(budgetType);

            await onSubmit();
          }}
        >
          <TextInput
            label='New Budget Category'
            value={budgetType.name}
            onChange={(e) =>
              setBudgetType({ ...budgetType, name: e.target.value! })
            }
          />

          <TextArea
            label='Description'
            value={budgetType.description}
            onChange={(e) =>
              setBudgetType({ ...budgetType, description: e.target.value! })
            }
          />

          <Button name='Save new category' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default AddBudgetCategory;
