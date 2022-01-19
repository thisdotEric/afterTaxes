import React, { FC } from 'react';
import './TextInput.css';

interface TextInputProps {
  name: string;
  placeholder: string;
  type: 'text' | 'password' | 'number' | 'email';
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number;
  step?: string;
  value: any;
  title: string;
}

const TextInput: FC<TextInputProps> = (textInputProps: TextInputProps) => {
  return (
    <div className="text-input">
      <input
        id="input"
        spellCheck="false"
        style={{
          width: textInputProps.width ? `${textInputProps.width}px` : '300px',
        }}
        {...textInputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          textInputProps.onChange(e);
        }}
      />
    </div>
  );
};

export default TextInput;
