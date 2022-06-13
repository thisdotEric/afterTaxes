import React, { FC, forwardRef } from 'react';
import './Input.css';
import { Group, Text, Select } from '@mantine/core';
import { ChartPie } from 'tabler-icons-react';

export interface BudgetItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  remainingBudget: number;
  value: string;
}

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
            <span id='remaining-budget'>
              {' '}
              &#x20B1;{remainingBudget.toFixed(2)}
            </span>
          </Text>
        </div>
      </Group>
    </div>
  )
);

interface BudgetDropDownProps {
  remainingBudgets: BudgetItemProps[];
  onChange: (value: string | null) => void;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
  error?: React.ReactNode;
  value?: string | null | undefined;
  ref?: React.Ref<HTMLInputElement> | undefined;
  label?: React.ReactNode;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
}

const BudgetDropDown: FC<BudgetDropDownProps> = ({
  remainingBudgets,
  onChange,
  disabled,
  setCurrentValue,
  placeholder,
}: BudgetDropDownProps) => {
  return (
    <Select
      disabled={disabled}
      autoComplete='off'
      onChange={(value) => {
        onChange(value);

        const current = remainingBudgets.filter((r) => r.value === value)[0]
          .remainingBudget;
        setCurrentValue(current);
      }}
      label='Budget Type'
      placeholder={placeholder === undefined ? 'Budget Type' : placeholder}
      itemComponent={SelectItem}
      data={remainingBudgets}
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
