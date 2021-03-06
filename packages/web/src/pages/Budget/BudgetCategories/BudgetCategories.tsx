import React, { FC, useEffect, useState } from 'react';
import { axios } from '../../../utils';
import { Button, Accordion } from '@mantine/core';
import {
  AccordionContent,
  CategoriesAccordionWrapper,
} from './BudgetCategories.styles';
import AddBudgetCategory from '../../../components/Budget/AddBudgetCategory';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import RemainingBudgetPerCategory from './RemainingBudgetPerCategory';

interface BudgetCategoriesProps {}

interface AccordionLabelProps {
  category: string;
  description: string;
}

function AccordionLabel({ category, description }: AccordionLabelProps) {
  return (
    <div>
      <p id='label'>{category}</p>
      {description !== '' && <p id='description'>{description}</p>}
    </div>
  );
}

export interface BudgetCategory {
  category_id: number;
  category: string;
  description: string;
}

const BudgetCategories: FC<
  BudgetCategoriesProps
> = ({}: BudgetCategoriesProps) => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [openAddBudgetCategories, setOpenAddBudgetCategories] = useState(false);
  const [openedConfirmDeleteModal, setOpenedConfirmDeleteModal] =
    useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);

  const fetchBudgetCategories = async () => {
    const { data } = await axios.get('budgets/categories');

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

  const items = categories.map((item) => (
    <Accordion.Item
      label={<AccordionLabel {...item} />}
      key={item.category_id}
      onClick={() => {
        setCurrentCategoryId(item.category_id);
      }}
    >
      <AccordionContent>
        <div className='actions'>
          <Button size='xs'>Edit</Button>
          &nbsp;
          <Button
            size='xs'
            id='delete'
            onClick={() => setOpenedConfirmDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </AccordionContent>

      {/* Remaining budgets in this category */}
      <RemainingBudgetPerCategory budget_id={item.category_id} />
    </Accordion.Item>
  ));

  return (
    <CategoriesAccordionWrapper>
      <AddBudgetCategory
        opened={openAddBudgetCategories}
        setOpened={setOpenAddBudgetCategories}
        onSubmit={async () => {
          await fetchBudgetCategories();
        }}
      />

      <ConfirmModal
        opened={openedConfirmDeleteModal}
        setOpened={setOpenedConfirmDeleteModal}
        onSubmit={async () => {
          console.log(currentCategoryId);

          await axios.delete(
            `budgets/categories/${currentCategoryId}?month=${6}&year=${2022}`
          );

          await fetchBudgetCategories();
        }}
        modalTitle='Confirm delete budget category?'
        confirmMessage='Delete'
        optionalNote={`The total remaining budget will be returned to unallocated budget section.`}
      />

      <Button
        size='xs'
        id='add-category-btn'
        onClick={() => {
          setOpenAddBudgetCategories(true);
        }}
      >
        + Add new budget category
      </Button>
      <Accordion
        initialItem={-1}
        iconPosition='right'
        classNames={{
          control: 'accordion-control',
          label: 'item-title',
          content: 'accordion-content',
          icon: 'accordion-icon',
        }}
      >
        {items}
      </Accordion>
    </CategoriesAccordionWrapper>
  );
};

export default BudgetCategories;
