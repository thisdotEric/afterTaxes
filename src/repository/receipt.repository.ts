import { drive, drive_v3 } from '@googleapis/drive';
import { TYPES } from '@ioc';
import { GoogleAuthObject } from '@authentication';
import { FileUpload } from 'graphql-upload';
import { Inject, Service } from 'typedi';

@Service()
export class ReceiptRepository {
  // Google drive object
  private readonly googleDrive: drive_v3.Drive;

  constructor(
    @Inject(TYPES.GoogleAuthObject) private readonly auth: GoogleAuthObject
  ) {
    this.googleDrive = drive({
      version: 'v3',
      auth: this.auth,
    });
  }

  // Upload image to Google drive
  async uploadImage({
    filename,
    mimetype,
    createReadStream,
  }: FileUpload): Promise<boolean> {
    // Upload a single file
    const response = await this.googleDrive.files.create({
      auth: this.auth,
      requestBody: {
        name: filename,
        mimeType: mimetype,
        parents: [process.env.GOOGLE_RECEIPTS_FOLDER!],
      },
      media: {
        mimeType: mimetype,
        body: createReadStream(),
      },
    });

    return response.status == 200 ? true : false;
  }
}
