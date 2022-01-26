import React, { FC } from 'react';
import { ProfileWrapper, InfoWrapper, Wrapper } from './UserProfile.styles';
import { TextInput } from '../../components/Form';
import { Edit3 as Edit } from 'react-feather';

interface UserProfileProps {}

interface UserInfo {
  info: string;
  label: string;
  readOnly: boolean;
  id: string;
}

interface IJobs {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
}

const userInfo: UserInfo[] = [
  {
    info: 'John Eric',
    label: 'First Name',
    readOnly: true,
    id: 'fname',
  },
  {
    info: 'Mendoza',
    label: 'Middle Name',
    readOnly: true,
    id: 'mname',
  },
  {
    info: 'Siguenza',
    label: 'Last Name',
    readOnly: true,
    id: 'lname',
  },
  {
    info: 'siguenzajohneric@gmail.com',
    label: 'Email Address',
    readOnly: true,
    id: 'email',
  },
];

const jobs: IJobs[] = [
  {
    company: 'Facebook (Meta)',
    position: 'Backend Engineer',
    startDate: 'Apr. 15, 2022',
    endDate: 'Present',
  },
  {
    company: 'Accenture',
    position: 'Senior Software Engineer',
    startDate: 'Jun. 15, 2022',
    endDate: 'Dec. 16, 2022',
  },
  {
    company: 'Code Disruptors Inc.',
    position: 'Associate Software Engineer',
    startDate: 'Apr. 15, 2021',
    endDate: 'Jan. 1, 2022',
  },
];

const UserProfile: FC<UserProfileProps> = ({}: UserProfileProps) => {
  return (
    <ProfileWrapper>
      <Wrapper>
        <p>
          User <span>Profile</span>
        </p>

        <div className='personal-info'>
          <InfoWrapper>
            <img
              src='https://avatars.githubusercontent.com/u/61216769?v=4'
              alt='Profile Picture'
            />
            <Edit id='edit-icon' width={25} height={25} />
          </InfoWrapper>

          {userInfo.map((info) => (
            <InfoWrapper key={info.id}>
              <TextInput type='text' value={info.info} {...info} />
              <Edit id='edit-icon' width={25} height={25} />
            </InfoWrapper>
          ))}
        </div>
      </Wrapper>

      <Wrapper>
        <p>
          Past/Present <span>Jobs</span>
        </p>

        <div className='jobs'>
          <table>
            <thead>
              <th>Position</th>
              <th>Company</th>
              <th>Employment Period</th>
              <th></th>
            </thead>
            <tbody>
              {jobs.map(({ company, position, startDate, endDate }, index) => (
                <tr id={`${index}`} className={index > 0 ? 'job-row' : ''}>
                  <td>{position}</td>
                  <td>{company}</td>
                  <td>{`${startDate} - ${endDate}`}</td>
                  <td id='action'>
                    <Edit id='edit-icon' width={20} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </ProfileWrapper>
  );
};

export default UserProfile;
