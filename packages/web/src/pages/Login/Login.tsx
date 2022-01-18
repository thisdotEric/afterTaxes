import React, { FC, useReducer, useState } from 'react';
import './Login.css';
import { SubmitButton, TextInput } from '../../components/Form';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

interface LoginState {
  email: string;
  password: string;
}

interface LoginAction {
  type: 'email' | 'password';
  payload: string;
}

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };

    case 'password':
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

const Login: FC<LoginProps> = ({}: LoginProps) => {
  const [checkBoxState, setCheckBoxState] = useState<boolean>(false);
  const [state, dispatch] = useReducer(loginReducer, {
    email: '',
    password: '',
  });

  const clickCheckbox = () => {
    setCheckBoxState(!checkBoxState);
  };

  let navigate = useNavigate();

  return (
    <div className='login'>
      <p id='app-name'>
        <span>after</span>Taxes
      </p>

      <form
        action=''
        onSubmit={(e) => {
          e.preventDefault();

          console.log(state);

          navigate('/dashboard');
        }}
      >
        <TextInput
          type='email'
          name='email'
          placeholder='Email'
          value='siguenza089@gmail.com'
          required={true}
          title='Email'
          onChange={(e) => {
            dispatch({ type: 'email', payload: e.currentTarget.value });
          }}
        />
        <TextInput
          type='password'
          name='password'
          title='Password'
          placeholder='Password'
          value='password'
          required={true}
          onChange={(e) => {
            dispatch({ type: 'password', payload: e.currentTarget.value });
          }}
        />

        <div id='remember'>
          <input
            type='checkbox'
            name='remember-me'
            checked={checkBoxState}
            onClick={clickCheckbox}
          />
          <p onClick={clickCheckbox}>Remember Me</p>
        </div>

        <SubmitButton id='login-btn' name='login' value='Sign In' />
      </form>
    </div>
  );
};

export default Login;
