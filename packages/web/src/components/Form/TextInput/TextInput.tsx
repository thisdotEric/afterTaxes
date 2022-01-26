import React, { FC, HTMLProps } from 'react';
import { InputWrapper } from './TextInput.styles';

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const TextInput: FC<TextInputProps> = (inputProps: TextInputProps) => {
  return (
    <InputWrapper>
      <input {...inputProps} />
      <label className={(inputProps.value as string) && 'filled'}>
        {inputProps.label}
      </label>
    </InputWrapper>
  );
};

export default TextInput;
