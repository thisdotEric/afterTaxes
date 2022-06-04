import React, { FC, useContext, useReducer, useRef, useState } from 'react';
import { LoginWrapper, RememberMe } from './Login.styles';
import { SubmitButton } from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import type { ILoggedInUser } from '@aftertaxes/commons';
import { github } from '../../assets';
import { TextInput, PasswordInput } from '../../components/Input';
interface LoginProps {}

interface LoginState {
  email: string;
  password: string;
}

interface LoginAction {
  type: 'email' | 'password';
  payload: string;
}

interface TData {
  login: ILoggedInUser;
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
  const [error, setError] = useState<string | null>();

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

          // const authenticatedUser = await graphql.request<TData, LoginState>(
          //   loginMutation,
          //   state
          // );

          // /**
          //  * Set the currently logged in user
          //  */
          setUser({
            email: 'siguenzajohneric@gmail.com',
            fullname: 'John Eric Siguenza',
          });

          navigate('/dashboard');
        }}
      >
        <TextInput
          label='Email'
          type='email'
          onChange={(e) => {
            dispatch({ type: 'email', payload: e.currentTarget.value });
            setError(null);
          }}
        />

        <PasswordInput
          label='Password'
          onChange={(e) => {
            dispatch({ type: 'password', payload: e.currentTarget.value });
            setError(null);
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

        <a href='https://github.com/thisdotEric/afterTaxes' target='_blank'>
          <img src={github} alt='Github' width={30} height={30} id='github' />
        </a>
      </form>
    </LoginWrapper>
  );
};

export default Login;
