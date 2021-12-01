import React, { FC } from 'react';
import './Login.css';

interface LoginProps {}

const Login: FC<LoginProps> = ({}: LoginProps) => {
  return (
    <div className="login">
      <p>Login</p>
    </div>
  );
};

export default Login;
