import React, { FC } from 'react';
import './Input.css';
import { Select } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

interface DropdownData {
  value: string;
  label: string;
}
interface SelectInputProps {
  data: DropdownData[];
  onChange?: (value: string | null) => void;
}

const SelectInput: FC<SelectInputProps> = (props: SelectInputProps) => {
  return (
    <Select
      {...props}
      id='user-input'
      classNames={{
        label: 'input-label',
        dropdown: 'action-dropdown',
        item: 'action-item',
        wrapper: 'action-root',
      }}
      defaultValue={props.data[0].value}
      className='select-input'
      label='Budget Category'
      rightSection={<ChevronDown size={14} />}
      rightSectionWidth={30}
      placeholder='Budget Category'
      data={props.data}
    />
  );
};

export default SelectInput;
