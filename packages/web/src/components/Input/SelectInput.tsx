import React, { FC } from 'react';
import './Input.css';
import { Select, SelectProps } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

interface DropdownData {
  value: string;
  label: string;
}
interface SelectInputProps extends SelectProps {
  data: DropdownData[];
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
      className='select-input'
      rightSection={<ChevronDown size={14} />}
      rightSectionWidth={30}
      placeholder='Budget Category'
      data={props.data}
    />
  );
};

export default SelectInput;
