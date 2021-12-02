import React, { FC } from 'react';
import './Login.css';

interface LoginProps {}

const Login: FC<LoginProps> = ({}: LoginProps) => {
  return (
    <div className="login">
      <p id="app-name">afterTaxes</p>
      <div className="fields">
        <form action="">
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="email" placeholder="Password" />

          <div id="remember">
            <input type="checkbox" name="remember-me" />
            <p>Remember Me</p>
          </div>

          <input type="submit" name="login" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
