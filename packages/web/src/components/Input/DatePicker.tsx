import React, { FC } from 'react';
import './Input.css';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';

interface DatePickerProps {
  label: string;
  date: Date;
}

const DatePicker: FC<DatePickerProps> = ({ label, date }: DatePickerProps) => {
  return (
    <MantineDatePicker
      styles={{
        dropdown: { backgroundColor: '#2e3139' },
      }}
      label={label}
      placeholder='Pick date'
      defaultValue={date}
      firstDayOfWeek='sunday'
      classNames={{
        label: 'input-label',
      }}
      id='user-input'
      icon={<Calendar size={20} strokeWidth={1} />}
    />
  );
};

export default DatePicker;
