import ID from './ID';

interface IUser extends ID<string> {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export default IUser;
