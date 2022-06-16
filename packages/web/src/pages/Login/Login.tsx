import React, { FC, useContext, useReducer, useState } from 'react';
import { AccountActionWrapper, LoginWrapper, RememberMe } from './Login.styles';
import { SubmitButton } from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { github } from '../../assets';
import { TextInput, PasswordInput } from '../../components/Input';
import { axios } from '../../utils';
import { Button } from '@mantine/core';
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
    email: 'jason.conte@gmail.com',
    password: 'password',
  });
  const [error, setError] = useState<string>('');

  const { setUser } = useContext(UserContext);

  const clickCheckbox = () => {
    setCheckBoxState(!checkBoxState);
  };

  let navigate = useNavigate();

  return (
    <LoginWrapper>
      <p>
        <span>after</span>Taxes
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (state.email === '' || state.password === '')
            setError('Invalid email or password.');
          else setError('');

          try {
            const { data: user } = await axios.post('sessions', state);

            /**
             * Set the currently logged in user
             */
            setUser({
              email: user.email,
              fullname: user.fullname,
            });

            navigate('/dashboard');
          } catch (error) {
            setError('Invalid email or password.');
          }
        }}
      >
        <TextInput
          label='Email'
          type='email'
          value={state.email}
          onChange={(e) => {
            dispatch({ type: 'email', payload: e.currentTarget.value });
            setError('');
          }}
        />

        <PasswordInput
          label='Password'
          value={state.password}
          onChange={(e) => {
            dispatch({ type: 'password', payload: e.currentTarget.value });
            setError('');
          }}
        />

        <RememberMe>
          <input
            type='checkbox'
            name='remember-me'
            checked={checkBoxState}
            onClick={clickCheckbox}
          />
          <p onClick={clickCheckbox}>Remember Me</p>
        </RememberMe>

        {error && <p id='errMsg'>{error}</p>}
        <SubmitButton id='login-btn' name='login' value='Sign In' />

        <AccountActionWrapper>
          <Button
            size='xs'
            className='account-action'
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign up
          </Button>
          <Button size='xs' className='account-action'>
            Forgot Password?
          </Button>
        </AccountActionWrapper>

        <a href='https://github.com/thisdotEric/afterTaxes' target='_blank'>
          <img src={github} alt='Github' width={30} height={30} id='github' />
        </a>
      </form>
    </LoginWrapper>
  );
};

export default Login;
