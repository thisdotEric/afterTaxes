import React, { FC, HTMLProps } from 'react';
import './Input.css';
import { NumberInput, PasswordInput, TextInput } from '@mantine/core';
import {
  CurrencyDollar,
  EyeCheck,
  EyeOff,
  Key,
  Mail,
  Note,
  ReportMoney,
} from 'tabler-icons-react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  inputType: 'text' | 'number' | 'password' | 'email';
  label: string;
  error?: string;
}

const Input: FC<InputProps> = ({ inputType, label }: InputProps) => {
  return (
    <>
      {inputType === 'number' && (
        <NumberInput
          label={label}
          classNames={{
            label: 'input-label',
          }}
          id='user-input'
          icon={<CurrencyDollar stroke='white' size={20} strokeWidth={1} />}
          hideControls
          precision={2}
          min={0}
        />
      )}

      {inputType === 'text' && (
        <TextInput
          label={label}
          classNames={{
            label: 'input-label',
          }}
          id='user-input'
          icon={<Note stroke='white' size={20} strokeWidth={1} />}
        />
      )}

      {inputType === 'email' && (
        <TextInput
          label={label}
          classNames={{
            label: 'input-label',
          }}
          id='user-input'
          icon={<Mail stroke='white' size={20} strokeWidth={1} />}
        />
      )}

      {inputType === 'password' && (
        <PasswordInput
          label={label}
          classNames={{
            label: 'input-label',
          }}
          id='user-input'
          icon={<Key stroke='white' size={20} strokeWidth={1} />}
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
          }
        />
      )}
    </>
  );
};

export default Input;
