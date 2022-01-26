var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

interface IDate {
  month: number;
  day: number;
  year: number;
}

const prependZero = (dateValue: number): string => {
  return `${dateValue < 10 ? `0${dateValue}` : dateValue}`;
};

const formattedDateToday = (): string => {
  return `${year}-${prependZero(month)}-${prependZero(day)}`;
};

const formatCustomDate = ({ month, day, year }: IDate): string => {
  return `${year}-${prependZero(month)}-${prependZero(day)}`;
};

const tokenizeDate = (formattedDate: string): IDate => {
  const date = formattedDate.split('-');

  return {
    year: parseInt(date[0]),
    month: parseInt(date[1]),
    day: parseInt(date[2]),
  };
};

export {
  month,
  day,
  year,
  formattedDateToday,
  formatCustomDate,
  tokenizeDate,
  IDate,
};
