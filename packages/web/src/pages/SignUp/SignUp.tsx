import { LandingPageText } from '../../pages/Login/Login.styles';
import React, { FC } from 'react';
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
}

const SignUp: FC<SignUpProps> = ({}: SignUpProps) => {
  const navigate = useNavigate();

  return (
    <SignUpWrapper>
      <LandingPageText fontsize={25}>
        <span>Sign</span>up
      </LandingPageText>

      <form>
        <TextInput label='First Name' value='JOhn' />
        <TextInput label='Middle Name' value='JOhn' />
        <TextInput label='Middle Name' value='JOhn' />
        <TextInput label='Email Address' value='JOhn' />
        <PasswordInput label='Password' value='sdf' />
        <PasswordInput label='Confirm Password' value='sdsdfsdff' />
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
