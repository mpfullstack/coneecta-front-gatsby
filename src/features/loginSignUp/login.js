import React from 'react';
import RegisterLayout from '../../components/registerLayout';
import LoginForm from './loginForm';

// Cookies for browser
// https://www.npmjs.com/package/browser-cookies#examples

export const Login = ({ location }) => {
  return (
    <RegisterLayout location={location}>
      <LoginForm />
    </RegisterLayout>
  );
}

export default Login;