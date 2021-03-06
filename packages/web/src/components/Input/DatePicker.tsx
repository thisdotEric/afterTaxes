import React, { FC } from 'react';
import './Input.css';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';
import dayjs from 'dayjs';

interface DatePickerProps {
  label: string;
  date: Date;
  onChange?: (value: Date | null) => void;
  value?: Date | null | undefined;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  date,
  onChange,
  value,
}: DatePickerProps) => {
  return (
    <MantineDatePicker
      styles={{
        dropdown: { backgroundColor: '#2e3139' },
      }}
      label={label}
      value={value}
      placeholder='Pick date'
      minDate={dayjs(new Date()).startOf('month').toDate()}
      maxDate={dayjs(new Date()).endOf('month').toDate()}
      allowLevelChange={false}
      defaultValue={date}
      firstDayOfWeek='sunday'
      classNames={{
        label: 'input-label',
        arrow: 'arrow',
        dropdown: 'arrow',
      }}
      onChange={onChange}
      id='user-input'
      icon={<Calendar size={20} strokeWidth={1} />}
    />
  );
};

export default DatePicker;
