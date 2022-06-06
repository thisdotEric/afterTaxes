import React, { FC, forwardRef, useEffect, useState } from 'react';
import './Input.css';
import { Group, Text, Select } from '@mantine/core';
import { ChartPie } from 'tabler-icons-react';
import { axios } from '../../utils';

interface BudgetItemProps extends React.ComponentPropsWithoutRef<'div'> {
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
  onChange: (value: string | null) => void;
}

const BudgetDropDown: FC<BudgetDropDownProps> = ({
  onChange,
}: BudgetDropDownProps) => {
  const [remainingBudgets, setRemainingBudgets] = useState<BudgetItemProps[]>(
    []
  );

  const fetchBudgetBreakdown = async () => {
    const { data } = await axios.get('budgets/2022/06/remaining');

    console.log(data);

    setRemainingBudgets(() => {
      return data.map((d: any) => {
        return {
          label: d.name,
          remainingBudget: d.remainingBudget,
          value: d.budget_id,
        };
      });
    });
  };

  useEffect(() => {
    fetchBudgetBreakdown();
  }, []);

  return (
    <Select
      autoComplete='off'
      onChange={onChange}
      label='Budget Type'
      placeholder='Pick one'
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
