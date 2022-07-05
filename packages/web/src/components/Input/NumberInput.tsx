import React, { FC } from 'react';
import './Input.css';
import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';
import { CurrencyDollar } from 'tabler-icons-react';

interface NumberInputProps extends MantineNumberInputProps {}

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
      autoComplete='off'
      min={0}
    />
  );
};

export default NumberInput;
