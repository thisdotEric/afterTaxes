import React, { FC } from 'react';
import './User.css';
import { github, settings, sign_out } from '../../assets';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  fullName: string;
}

const User: FC<UserProps> = ({ fullName }: UserProps) => {
  const navigate = useNavigate();
  return (
    <div className="user">
      <p>{fullName}</p>

      <div className="user-links">
        <img
          src={settings}
          alt=""
          width={22}
          height={22}
          title="User settings"
        />
        <img
          src={sign_out}
          alt=""
          width={30}
          height={25}
          title="Sign out"
          onClick={e => {
            e.preventDefault();

            navigate('/');
          }}
        />
      </div>
    </div>
  );
};

export default User;
