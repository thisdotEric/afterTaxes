import 'dotenv/config';

function getCurrentDate() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

(async () => {
  /**
   * Use the current date as the database filename
   */
  const filename = getCurrentDate() + '.tar';

  console.log(filename);
})();