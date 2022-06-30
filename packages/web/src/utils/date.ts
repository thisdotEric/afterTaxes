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
