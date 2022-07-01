import React, { FC } from 'react';
import { CalendarContainer, CalendarContainerProps } from 'react-datepicker';

interface MonthPickerProps extends CalendarContainerProps {}

const MonthPicker: FC<MonthPickerProps> = ({
  children,
  className,
}: MonthPickerProps) => {
  return (
    <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
      <CalendarContainer className={className}>
        <div style={{ position: 'relative' }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

export default MonthPicker;
