import React, { FC, HTMLProps, useState } from 'react';
import { InputWrapper } from './TextInput.styles';
import { Eye, EyeOff } from 'react-feather';

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

const TextInput: FC<TextInputProps> = (inputProps: TextInputProps) => {
  const [passwordnInputType, setPasswordInputType] = useState<boolean>(
    inputProps.type === 'password'
  );

  return (
    <InputWrapper>
      <input
        {...inputProps}
        type={passwordnInputType ? 'password' : 'text'}
        spellCheck={false}
      />
      <label className={(inputProps.value as string) && 'filled'}>
        {inputProps.label}
      </label>

      {inputProps.type === 'password' && passwordnInputType && (
        <Eye
          id='eye'
          onClick={() => setPasswordInputType(!passwordnInputType)}
        />
      )}

      {inputProps.type === 'password' && !passwordnInputType && (
        <EyeOff
          id='eye'
          onClick={() => setPasswordInputType(!passwordnInputType)}
        />
      )}
    </InputWrapper>
  );
};

export default TextInput;
