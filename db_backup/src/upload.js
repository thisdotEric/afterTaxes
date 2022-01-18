import { drive } from '@googleapis/drive';
import { GoogleAuth } from 'google-auth-library';
import { createReadStream } from 'fs';

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
  const mimeType = ' application/x-tar';

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

export default uploadDbDumpToGoogleDrive;
