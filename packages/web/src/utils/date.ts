export interface IDate {
  month: number;
  day?: number;
  year: number;
}

export const getMonthAndYear = (date: Date): IDate => {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export const createDateWithTime = (date: Date) => {
  const currentTime = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    currentTime.getHours(),
    currentTime.getMinutes(),
    currentTime.getSeconds(),
    currentTime.getMilliseconds()
  );
};
