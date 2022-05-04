import React, { FC } from 'react';
import './Input.css';
import { EyeCheck, EyeOff, Key } from 'tabler-icons-react';
import { PasswordInput as MantinePasswordInput } from '@mantine/core';

interface PasswordInputProps {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const PasswordInput: FC<PasswordInputProps> = (props: PasswordInputProps) => {
  return (
    <MantinePasswordInput
      {...props}
      classNames={{
        label: 'input-label',
      }}
      id='user-input'
      icon={<Key stroke='white' size={20} strokeWidth={1} />}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
      }
    />
  );
};

export default PasswordInput;
