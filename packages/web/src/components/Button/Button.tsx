import React, { FC } from 'react';
import './Button.css';
import { Button as MantineButton } from '@mantine/core';
import { DeviceFloppy } from 'tabler-icons-react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  name: string;
  withIcon?: boolean;
  disable?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, name, disable }: ButtonProps) => {
  return (
    <MantineButton
      radius={10}
      leftIcon={<DeviceFloppy strokeWidth={1} size={20} />}
      classNames={{ root: 'root-btn' }}
      // onClick={onClick}
      type='submit'
      disabled={disable}
    >
      {name}
    </MantineButton>
  );
};

export default Button;
