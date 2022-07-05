import React, { FC } from 'react';
import './Button.css';
import { Button as MantineButton } from '@mantine/core';
import { ArrowsLeftRight, DeviceFloppy, Trash } from 'tabler-icons-react';

type SubmitType = 'save' | 'delete' | 'transfer';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  name: string;
  withIcon?: boolean;
  disable?: boolean;
  submitType?: SubmitType;
}

const Button: FC<ButtonProps> = ({
  name,
  disable,
  submitType = 'save',
}: ButtonProps) => {
  return (
    <MantineButton
      radius={10}
      leftIcon={
        submitType === 'delete' ? (
          <Trash strokeWidth={1} size={20} />
        ) : submitType === 'transfer' ? (
          <ArrowsLeftRight strokeWidth={1} size={20} />
        ) : (
          <DeviceFloppy strokeWidth={1} size={20} />
        )
      }
      classNames={{ root: submitType }}
      type='submit'
      disabled={disable}
    >
      {name}
    </MantineButton>
  );
};

export default Button;
