import { BaseEntity } from './base/base.entity';

export interface IUser extends BaseEntity<string> {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
}
