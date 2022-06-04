import type { IBudgetTimeline } from '../../../pages/Budget';
import React, { FC } from 'react';
import { Timeline, Text } from '@mantine/core';
import { Minus, Plus } from 'tabler-icons-react';

interface BudgetTimelineProps {
  timeline: IBudgetTimeline[];
}

const BudgetTimeline: FC<BudgetTimelineProps> = ({
  timeline,
}: BudgetTimelineProps) => {
  return (
    <Timeline active={timeline.length} bulletSize={24} lineWidth={2}>
      {timeline.map(
        ({ amount, date, description, deductFunds: decuctFunds }) => (
          <Timeline.Item
            bullet={
              decuctFunds ? (
                <Minus size={12} strokeWidth={5} />
              ) : (
                <Plus size={12} strokeWidth={5} />
              )
            }
            color={decuctFunds ? 'red' : 'teal'}
            id='budget-history-title'
            classNames={{
              itemTitle: 'item-title',
            }}
            title={amount.toFixed(2)}
          >
            <Text color='dimmed' size='sm'>
              {description}
            </Text>
            <Text size='xs' mt={4}>
              {date.toDateString()}
            </Text>
          </Timeline.Item>
        )
      )}
    </Timeline>
  );
};

export default BudgetTimeline;
