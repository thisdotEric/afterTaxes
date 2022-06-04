import React, { FC } from 'react';
import './Input.css';
import { ClipboardText, Mail } from 'tabler-icons-react';
import { TextInput as MantineTextInput } from '@mantine/core';

interface TextInputProps {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  type?: 'email' | 'text';
  disabled?: boolean;
  value: string;
  error?: string;
}

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <MantineTextInput
      {...props}
      classNames={{
        label: 'input-label',
      }}
      id='user-input'
      disabled={props.disabled}
      icon={
        props.type === 'email' ? (
          <Mail stroke='white' size={20} strokeWidth={1} />
        ) : (
          <ClipboardText stroke='white' size={20} strokeWidth={1} />
        )
      }
    />
  );
};

export default TextInput;
