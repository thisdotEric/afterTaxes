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
  label: string;
  error?: React.ReactNode;
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
