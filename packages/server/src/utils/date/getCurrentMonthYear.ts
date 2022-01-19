export default function getCurrentMonthAndYear() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${year}-${month}`;
}
