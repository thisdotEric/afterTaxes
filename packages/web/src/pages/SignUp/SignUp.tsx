import { LandingPageText } from '../../pages/Login/Login.styles';
import React, { FC, useReducer, useState } from 'react';
import { SignUpWrapper } from './SignUp.styles';
import { PasswordInput, TextInput } from '../../components/Input';
import { Button } from '../../components/Button';
import { Button as MantineButton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {}

interface SignupUser {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpAction {
  type:
    | 'email'
    | 'password'
    | 'first_name'
    | 'middle_name'
    | 'last_name'
    | 'confirmpass';
  payload: string;
}

function signUpReducer(state: SignupUser, action: SignUpAction): SignupUser {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'first_name':
      return { ...state, first_name: action.payload };
    case 'middle_name':
      return { ...state, middle_name: action.payload };
    case 'last_name':
      return { ...state, last_name: action.payload };
    case 'confirmpass':
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}

const SignUp: FC<SignUpProps> = ({}: SignUpProps) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(signUpReducer, {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordErr, setPasswordErr] = useState('');

  return (
    <SignUpWrapper>
      <LandingPageText fontsize={25}>
        <span>Sign</span>up
      </LandingPageText>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (state.confirmPassword !== state.password) {
            setPasswordErr('Password does not match.');
            return;
          } else {
            console.log(state);
            navigate('/signin');
          }
        }}
      >
        <TextInput
          label='First Name'
          value={state.first_name}
          onChange={(e) =>
            dispatch({ type: 'first_name', payload: e.target.value })
          }
        />
        <TextInput
          label='Middle Name'
          value={state.middle_name}
          onChange={(e) =>
            dispatch({ type: 'middle_name', payload: e.target.value })
          }
        />
        <TextInput
          label='Last Name'
          value={state.last_name}
          onChange={(e) =>
            dispatch({ type: 'last_name', payload: e.target.value })
          }
        />
        <TextInput
          label='Email Address'
          value={state.email}
          onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
        />
        <PasswordInput
          label='Password'
          value={state.password}
          onChange={(e) => {
            dispatch({ type: 'password', payload: e.target.value });
            setPasswordErr('');
          }}
          error={passwordErr}
        />
        <PasswordInput
          label='Confirm Password'
          value={state.confirmPassword}
          onChange={(e) => {
            dispatch({ type: 'confirmpass', payload: e.target.value });
            setPasswordErr('');
          }}
          error={passwordErr}
        />
        <Button name='Signup' />
      </form>

      <MantineButton
        size='xs'
        className='account-action'
        onClick={() => {
          navigate('/signin');
        }}
      >
        Signin
      </MantineButton>
    </SignUpWrapper>
  );
};

export default SignUp;
