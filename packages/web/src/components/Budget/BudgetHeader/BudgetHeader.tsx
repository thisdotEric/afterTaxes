import type { BudgetBreakdown } from '../../../pages/Budget';
import React, { FC, useMemo } from 'react';
import {
  BudgetHeaderWrapper,
  BudgetText,
} from '../../../pages/Budget/Budget.styles';
import { Button } from '@mantine/core';

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
        <BudgetText>
          Total Monthly Budget: <span>{budgetBreakdown.total.toFixed(2)}</span>
        </BudgetText>
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
