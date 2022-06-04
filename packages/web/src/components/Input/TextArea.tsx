import React, { FC } from 'react';
import './Input.css';
import { Textarea as MantineTextArea } from '@mantine/core';
import { Notes } from 'tabler-icons-react';

interface TextAreaProps {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  label: string;
  value: string;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  onChange,
  value,
}: TextAreaProps) => {
  return (
    <MantineTextArea
      label={label}
      value={value}
      classNames={{
        label: 'input-label',
      }}
      id='user-input'
      icon={<Notes stroke='white' size={20} strokeWidth={1} />}
      autosize
      minRows={5}
      spellCheck={false}
      onChange={onChange}
    />
  );
};

export default TextArea;
