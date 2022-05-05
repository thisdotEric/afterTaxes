import React, { FC, forwardRef } from 'react';
import './Input.css';
import { Group, Text, Select } from '@mantine/core';
import { ChartPie } from 'tabler-icons-react';

interface BudgetItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  remainingBudget: number;
  value: string;
}

const budgetData = [
  {
    label: 'Daily',
    remainingBudget: 100.5,
    value: 'Daily',
  },
  {
    label: 'Food',
    remainingBudget: 405.56,
    value: 'Food',
  },
  {
    label: 'Tech',
    remainingBudget: 56.236,
    value: 'Tech',
  },
  {
    label: 'Transportation',
    remainingBudget: 5622,
    value: 'Transportation',
  },
];

const SelectItem = forwardRef<HTMLDivElement, BudgetItemProps>(
  ({ remainingBudget, label, ...others }: BudgetItemProps, ref) => (
    <div ref={ref} {...others} id='budget-dropdown-component'>
      <Group noWrap>
        <div>
          <Text size='sm' id='dropdown-label'>
            {label}
          </Text>
          <Text size='xs' color='dimmed'>
            Remaining Budget:
            <span id='remaining-budget'> &#x20B1;{remainingBudget}</span>
          </Text>
        </div>
      </Group>
    </div>
  )
);

interface BudgetDropDownProps {
  onChange: (value: string | null) => void;
}

const BudgetDropDown: FC<BudgetDropDownProps> = ({
  onChange,
}: BudgetDropDownProps) => {
  return (
    <Select
      autoComplete='off'
      onChange={onChange}
      label='Budget Type'
      placeholder='Pick one'
      itemComponent={SelectItem}
      data={budgetData}
      searchable
      maxDropdownHeight={400}
      id='user-input'
      classNames={{
        label: 'input-label',
        dropdown: 'dropdown',
      }}
      nothingFound='Budget not found'
      icon={<ChartPie size={20} strokeWidth={1} />}
      filter={(value, item) =>
        item.label!.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.remainingBudget
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase().trim())
      }
    />
  );
};

export default BudgetDropDown;
