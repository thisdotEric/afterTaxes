import React, { FC, useEffect, useState } from 'react';
import { axios } from '../../../utils';
import SharedModal from '../../../components/Modal';
import { FormWrapper } from '../../../components/styles/FormWrapper.styles';
import type { RequiredModalProps } from '../../../components/Modal/SharedModal';
import { Card } from '@mantine/core';
import { Button } from '../../Button';

interface BudgetCategoriesModalProps extends RequiredModalProps {}

interface BudgetCategory {
  category_id: number;
  category: string;
  description: string;
}

const BudgetCategoriesModal: FC<BudgetCategoriesModalProps> = ({
  opened,
  setOpened,
  onSubmit,
}: BudgetCategoriesModalProps) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);

  const fetchBudgetCategories = async () => {
    const { data } = await axios.get('budgets/categories');

    console.log(data);

    setCategories(
      data.map((c: any) => ({
        category_id: c.budget_type_id,
        category: c.type,
        description: c.description,
      }))
    );
  };

  useEffect(() => {
    fetchBudgetCategories();
  }, []);

  return (
    <SharedModal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title='Budget Categories'
    >
      <FormWrapper>
        <form>
          {categories.map(({ category }) => (
            <p>{category}</p>
          ))}

          <Button name='Save updated categories' />
        </form>
      </FormWrapper>
    </SharedModal>
  );
};

export default BudgetCategoriesModal;
