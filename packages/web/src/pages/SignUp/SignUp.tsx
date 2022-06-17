import { LandingPageText } from '../../pages/Login/Login.styles';
import React, { FC } from 'react';
import { SignUpWrapper } from './SignUp.styles';
import { PasswordInput, TextInput } from '../../components/Input';
import { Button } from '../../components/Button';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}: SignUpProps) => {
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
    </SignUpWrapper>
  );
};

export default SignUp;
