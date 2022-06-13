import { Button, Menu } from '@mantine/core';
import type { CurrentRow } from '../../pages/Expenses/Expenses';
import React, { FC } from 'react';
import { ChevronDown } from 'tabler-icons-react';

export interface ActionList {
  value: string;
  label: string;
  icon: JSX.Element;
  action: (row: CurrentRow) => void;
}

interface ActionMenuProps {
  actions: ActionList[];
  currentRow: CurrentRow;
}

const ActionMenu: FC<ActionMenuProps> = ({
  actions,
  currentRow,
}: ActionMenuProps) => {
  return (
    <Menu
      withArrow
      control={
        <Button size='xs' id='action-btn' rightIcon={<ChevronDown size={12} />}>
          Action
        </Button>
      }
    >
      <Menu.Label>Danger zone</Menu.Label>
      {actions.map(({ label, icon, action }) => (
        <Menu.Item
          icon={icon}
          onClick={() => {
            action(currentRow);
          }}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ActionMenu;
