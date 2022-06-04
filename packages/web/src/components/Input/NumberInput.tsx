import React, { FC } from 'react';
import './Input.css';
import { NumberInput as MantineNumberInput } from '@mantine/core';
import { CurrencyDollar } from 'tabler-icons-react';

interface NumberInputProps {
  label: string;
  onChange?: (value: number | undefined) => void;
  value: number;
  disabled?: boolean;
  error?: string;
}

const NumberInput: FC<NumberInputProps> = (props: NumberInputProps) => {
  return (
    <MantineNumberInput
      {...props}
      classNames={{
        label: 'input-label',
      }}
      id='user-input'
      icon={<CurrencyDollar stroke='white' size={20} strokeWidth={1} />}
      hideControls
      precision={2}
      min={0}
    />
  );
};

export default NumberInput;
