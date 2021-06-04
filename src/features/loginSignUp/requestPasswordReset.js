import React from 'react';
import RegisterLayout from '../../components/registerLayout';
import RequestPasswordResetForm from './requestPasswordResetForm';

export const Login = ({ location }) => {
  return (
    <RegisterLayout location={location}>
      <RequestPasswordResetForm />
    </RegisterLayout>
  );
}

export default Login;