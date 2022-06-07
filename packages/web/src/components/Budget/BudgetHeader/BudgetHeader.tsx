import type { BudgetBreakdown } from '../../../pages/Budget';
import React, { FC, useMemo } from 'react';
import { BudgetHeaderWrapper, BudgetText } from './BudgetHeader.styles';
import { Button, UnstyledButton } from '@mantine/core';
import { History } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

interface BudgetHeaderProps {
  budgetBreakdown: BudgetBreakdown;
  openAddFundsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BudgetHeader: FC<BudgetHeaderProps> = ({
  budgetBreakdown,
  openAddFundsModal,
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
        <Button size='xs' onClick={() => openAddFundsModal(true)}>
          Add funds
        </Button>
      </BudgetHeaderWrapper>
    )
  );
};

export default BudgetHeader;
