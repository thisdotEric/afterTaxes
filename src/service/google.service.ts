import { Inject, Service } from 'typedi';
import { FileUpload } from 'graphql-upload';
import { IFolder } from '@entity';
import { GoogleAuthObject } from '@authentication';
import { TYPES } from '@ioc';
import { drive, drive_v3 } from '@googleapis/drive';
import { KnexUnitOfWork } from '@unit-of-work';
import { getCurrentMonthAndYear } from '@utils/date';

@Service()
export class GoogleService {
  // Google drive object
  private readonly googleDrive: drive_v3.Drive;

  // Google drive authentication object
  @Inject(TYPES.GoogleAuthObject) private readonly auth: GoogleAuthObject;

  constructor(private readonly knexUOW: KnexUnitOfWork) {
    this.googleDrive = drive({
      version: 'v3',
      auth: this.auth,
    });
  }

  async uploadImage({
    filename,
    mimetype,
    createReadStream,
  }: FileUpload): Promise<boolean> {
    // Current month and year is used as folder name
    const folderName: string = getCurrentMonthAndYear();

    let responseStatusCode: number = 400;

    try {
      // Get the folder information from the database
      const folderInfo = await this.knexUOW.folderRepository.getById(
        folderName
      );

      let folderId = '';

      // Create a new folder
      if (!folderInfo) {
        folderId = await this.createFolderInGoogleDrive(folderName);

        // Save the folder information to the database
        await this.knexUOW.folderRepository.add({
          folderId,
          id: folderName,
        });
      } else {
        folderId = folderInfo.id;
      }

      // Upload a single file
      const response = await this.googleDrive.files.create({
        auth: this.auth,
        requestBody: {
          name: filename,
          mimeType: mimetype,
          parents: [folderId],
        },
        media: {
          mimeType: mimetype,
          body: createReadStream(),
        },
      });

      responseStatusCode = response.status;

      this.knexUOW.commit();
    } catch (error) {
      this.knexUOW.rollback();
    }

    return responseStatusCode === 200;
  }

  private async createFolderInGoogleDrive(folderName: string): Promise<string> {
    const GOOGLE_FOLDER_MIMETYPE = 'application/vnd.google-apps.folder';

    const response = await this.googleDrive.files.create({
      auth: this.auth,
      fields: 'id',
      requestBody: {
        name: folderName,
        mimeType: GOOGLE_FOLDER_MIMETYPE,
        parents: [process.env.GOOGLE_RECEIPTS_FOLDER!],
      },
    });

    return `${response.data.id}`;
  }
}
