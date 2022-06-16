import { Button, Menu } from '@mantine/core';
import type { CurrentRow } from '../../pages/Expenses/Expenses';
import React, { FC } from 'react';
import { ChevronDown } from 'tabler-icons-react';
import { MenuWrapper } from './ActionMenu.styles';
import { secondarybg } from '../../components/styles/colors';

export interface ActionList {
  value: string;
  label: string;
  icon: JSX.Element;
  isDanger?: boolean;
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
    <MenuWrapper>
      <Menu
        size={'xs'}
        shadow={'lg'}
        classNames={{
          itemHovered: 'menu-root',
        }}
        styles={{
          body: {
            backgroundColor: `${secondarybg}`,
            border: 'none',
          },
          arrow: {
            backgroundColor: `${secondarybg}`,
            border: 'none',
          },
          item: {
            color: 'white',
            fontSize: 12,
            backgroundColor: `${secondarybg}`,
          },
        }}
        withArrow
        control={
          <Button
            size='xs'
            id='action-btn'
            rightIcon={<ChevronDown size={12} />}
          >
            Action
          </Button>
        }
      >
        <Menu.Label>Actions</Menu.Label>
        {actions.map(({ label, icon, action, isDanger }) => {
          return (
            !isDanger && (
              <Menu.Item
                icon={icon}
                onClick={() => {
                  action(currentRow);
                }}
              >
                {label}
              </Menu.Item>
            )
          );
        })}

        <Menu.Label>Danger zone</Menu.Label>
        {actions.map(({ label, icon, action, isDanger }) => {
          return (
            isDanger && (
              <Menu.Item
                icon={icon}
                onClick={() => {
                  action(currentRow);
                }}
              >
                {label}
              </Menu.Item>
            )
          );
        })}
      </Menu>
    </MenuWrapper>
  );
};

export default ActionMenu;
