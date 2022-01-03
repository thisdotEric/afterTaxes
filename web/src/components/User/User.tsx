import React, { FC } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  fullName: string;
}

const User: FC<UserProps> = ({ fullName }: UserProps) => {
  const navigate = useNavigate();
  return (
    <div className="user">
      <div id="name">
        <img
          id="profile"
          src="https://randomuser.me/api/portraits/med/men/30.jpg"
          alt="Profile Picture"
          title="John Eric Siguenza"
        />

        <p>{fullName}</p>
      </div>
    </div>
  );
};

export default User;
