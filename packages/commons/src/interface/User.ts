import ID from './ID';

export interface IUser extends ID<string> {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export interface ILoggedInUser {
  email: IUser['email'];
  fullname: string;
}
