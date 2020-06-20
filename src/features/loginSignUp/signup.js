import React from 'react';
import RegisterLayout from '../../components/registerLayout';
import SignUpForm from './signUpForm';

export const SignUp = ({ location }) => {
  return (
    <RegisterLayout location={location}>
      <SignUpForm />
    </RegisterLayout>
  );
}

export default SignUp;