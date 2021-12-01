import { DbNames } from '@database/constants';
import { IFolder } from '@entity';
import TYPES from '@ioc/bindings';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { BaseRepository } from './base/base.repository';

@Service()
export class FolderRepository implements BaseRepository<IFolder, string> {
  constructor(
    @Inject(TYPES.KnexTransaction) private readonly db: Knex.Transaction
  ) {}

  async getById(folderName: string): Promise<IFolder | undefined> {
    const folder: IFolder | undefined = await this.db(DbNames.GDRIVE_FOLDER)
      .select<IFolder>('folder_name as id', 'folder_id as folderId')
      .where({ folder_name: folderName })
      .first();

    return folder;
  }

  async add({ folderId, id }: IFolder): Promise<boolean> {
    await this.db(DbNames.GDRIVE_FOLDER).insert({
      folder_name: id,
      folder_id: folderId,
    });

    return true;
  }
}
