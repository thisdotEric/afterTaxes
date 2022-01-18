import { exec } from 'child_process';

const password = `${process.env.DB_PASSWORD}`;
const db_name = `${process.env.DB_NAME}`;
const user = `${process.env.DB_USER}`;
const port = `${process.env.DB_PORT}`;
const host = `${process.env.DB_HOST}`;

const backupDatabase = async (filename) => {
  exec(
    `PGPASSWORD="${password}" pg_dump -h ${host} -U ${user} -p ${port} -d ${db_name} -F p > ${filename}`,
    (error, stdout, stderr) => {
      if (error) throw new Error('Backup creation failed');

      /**
       * Upload the database backup to Google Drive
       */
      uploadDbDumpToGoogleDrive(filename).then((response) => {
        console.log(response.statusText, response.status);
      });
    }
  );
};

export default backupDatabase;
