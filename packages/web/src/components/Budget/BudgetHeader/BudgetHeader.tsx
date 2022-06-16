import type { BudgetActions, BudgetBreakdown } from '../../../pages/Budget';
import React, { FC, useMemo } from 'react';
import { BudgetHeaderWrapper, BudgetText } from './BudgetHeader.styles';
import { Button, Menu, UnstyledButton } from '@mantine/core';
import { ChevronDown, History } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

interface BudgetHeaderProps {
  budgetBreakdown: BudgetBreakdown;
  actions: BudgetActions[];
}

const BudgetHeader: FC<BudgetHeaderProps> = ({
  budgetBreakdown,
  actions,
}: BudgetHeaderProps) => {
  const unAllocatedPercentage = useMemo(
    () =>
      ((budgetBreakdown.unallocated / budgetBreakdown.total) * 100).toFixed(2),
    [budgetBreakdown]
  );

  return (
    budgetBreakdown && (
      <BudgetHeaderWrapper>
        <div id='budget'>
          <BudgetText>
            Total Monthly Budget:{' '}
            <span>{budgetBreakdown.total.toFixed(2)}</span>
          </BudgetText>
          &nbsp;&nbsp;
          <UnstyledButton component={Link} to={'/budget/history'}>
            <History stroke='white' size={16} />
          </UnstyledButton>
        </div>
        <BudgetText>
          Unallocated Budget:{' '}
          <span>
            {budgetBreakdown.unallocated.toFixed(2)}{' '}
            <span>({unAllocatedPercentage}%)</span>
          </span>
        </BudgetText>

        <Menu
          withArrow
          control={
            <Button
              size='xs'
              id='action-btn'
              rightIcon={<ChevronDown size={12} />}
            >
              Actions
            </Button>
          }
        >
          {actions.map(({ label, icon, action }) => (
            <Menu.Item icon={icon} onClick={() => action()}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </BudgetHeaderWrapper>
    )
  );
};

export default BudgetHeader;
