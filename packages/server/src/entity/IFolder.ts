import { BaseEntity } from './base/base.entity';

export interface IFolder extends BaseEntity<string> {
  folderId: string;
}
