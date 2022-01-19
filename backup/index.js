import 'dotenv/config';
import { exec } from 'child_process';
import { drive } from '@googleapis/drive';
import { GoogleAuth } from 'google-auth-library';
import { createReadStream } from 'fs';

/**
 * Database credentials
 */
const password = `${process.env.DB_PASSWORD}`;
const db_name = `${process.env.DB_NAME}`;
const user = `${process.env.DB_USER}`;
const port = `${process.env.DB_PORT}`;
const host = `${process.env.DB_HOST}`;

/**
 * Helper function to upload backup file on Google drive
 */
const uploadDbDumpToGoogleDrive = async (filename) => {
  const client_email = `${process.env.SERVICE_EMAIL}`;
  const private_key = process.env.PRIVATE_KEY.replace(/\\n/gm, '\n');

  const auth = await new GoogleAuth({
    credentials: {
      private_key,
      client_email,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  }).getClient();

  const googleDrive = drive({
    version: 'v3',
    auth,
  });

  const folderId = `${process.env.FOLDER_ID}`;
  const mimeType = 'application/x-tar';

  const response = await googleDrive.files.create({
    auth,
    requestBody: {
      name: filename,
      mimeType,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: createReadStream(filename),
    },
  });

  return response;
};

function getCurrentDate() {
  const date = new Date();

  // Example return: 2022-January-12
  return `${date.getFullYear()}-${date.toLocaleString('default', {
    month: 'long',
  })}-${date.getDate()}`;
}

/**
 * Use the current date as the database filename
 */
const filename = getCurrentDate() + '.tar';

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
