import React, { FC } from 'react';
import './Input.css';
import { Select } from '@mantine/core';

interface SelectInputProps {}

const SelectInput: FC<SelectInputProps> = ({}: SelectInputProps) => {
  return (
    <Select
      id='user-input'
      label='Budget Type'
      classNames={{
        label: 'input-label',
      }}
      data={[
        { value: 'react', label: 'React', group: 'best' },
        { value: 'ng', label: 'Angular', group: 'not' },
        { value: 'svelte', label: 'Svelte', group: 'not' },
        { value: 'vue', label: 'Vue', group: 'not' },
      ]}
    />
  );
};

export default SelectInput;
