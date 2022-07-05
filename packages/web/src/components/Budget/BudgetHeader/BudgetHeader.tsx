import type { BudgetActions, BudgetBreakdown } from '../../../pages/Budget';
import React, { FC, useMemo } from 'react';
import { BudgetHeaderWrapper, BudgetText } from './BudgetHeader.styles';
import ActionMenu from '../../../components/Menu';

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
        </div>
        <BudgetText>
          Unallocated Budget:{' '}
          <span>
            {budgetBreakdown.unallocated.toFixed(2)}{' '}
            <span>({unAllocatedPercentage}%)</span>
          </span>
        </BudgetText>

        <ActionMenu actions={actions} />
      </BudgetHeaderWrapper>
    )
  );
};

export default BudgetHeader;
