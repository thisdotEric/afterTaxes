import { getCurrentMonthAndYear } from '@utils/date';

describe('Date test', () => {
  it('should match the current date and year', () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    expect(getCurrentMonthAndYear()).toBe(`${year}-${month}`);
  });

  it('should not be equal (or fail) when middle hypen is ommitted', () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    expect(getCurrentMonthAndYear()).not.toEqual(`${year}${month}`);
  });
});
