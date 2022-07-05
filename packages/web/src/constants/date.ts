var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

interface IDate {
  month: number;
  day?: number;
  year: number;
}

export { month, day, year, IDate };
