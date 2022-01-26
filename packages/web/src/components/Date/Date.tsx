import React, { FC } from 'react';
import { DateText } from './Date.styles';
import { calendar } from '../../assets';

interface DateProps {
  date?: number;
  month: number;
  year: number;
}

function monthToString(month: number) {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';

    default:
      return 'Invalid Month';
  }
}

const Date: FC<DateProps> = ({ year, month, date }) => {
  return (
    <DateText>
      <span id='month'>{monthToString(month)} </span>
      {date && (
        <>
          <span id='month'>{date}</span>
          <span id='month'>, </span>
        </>
      )}
      <span id='year'>{year}</span>
      <span> </span>
      <a href=''>
        <img
          src={calendar}
          alt=''
          title='Change Date'
          width={20}
          height={20}
          id='calendar-icon'
        />
      </a>
    </DateText>
  );
};

export default Date;
