import React, { FC, useCallback, useEffect, useState } from 'react';
import type { CategorizedBudget } from '../../../../pages/Budget';
import { axios } from '../../../../utils';
import { RemainingBudgetWrapper } from './RemainingBudgetPerCategory.styles';

interface RemainingBudgetPerCategoryProps {
  budget_id: number;
}

const RemainingBudgetPerCategory: FC<RemainingBudgetPerCategoryProps> = ({
  budget_id,
}: RemainingBudgetPerCategoryProps) => {
  const [budgets, setBudgets] = useState<CategorizedBudget[]>([]);

  const computeTotalRemaining = useCallback((): number => {
    let total = 0;

    budgets.forEach(({ remainingBudget }) => {
      total += remainingBudget;
    });

    return total;
  }, [budgets]);

  const fetchBudgetPageValues = useCallback(async () => {
    const { data: categorized_budget } = await axios.get(
      `budgets/2022/06/categories?id=${budget_id}`
    );

    setBudgets(categorized_budget);
  }, [budget_id]);

  useEffect(() => {
    fetchBudgetPageValues();
  }, []);

  return (
    <>
      {budgets.map((a) => {
        return (
          <RemainingBudgetWrapper>
            <p>{a.name}</p>
            <p id='remaining-amount'>
              {a.remainingBudget.toFixed(2)}{' '}
              <span id='remaining'> remaining</span>{' '}
            </p>
          </RemainingBudgetWrapper>
        );
      })}

      <div style={{ marginTop: 10, display: 'block' }} />
      <RemainingBudgetWrapper>
        <p></p>
        <p id='remaining-amount'>
          {computeTotalRemaining().toFixed(2)}{' '}
          <span id='remaining'> total remaining </span>{' '}
        </p>
      </RemainingBudgetWrapper>
    </>
  );
};

export default RemainingBudgetPerCategory;
