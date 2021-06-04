import React from 'react';
import RegisterLayout from '../../components/registerLayout';
import PasswordResetForm from './passwordResetForm';

export const PasswordReset = ({ location }) => {
  return (
    <RegisterLayout location={location}>
      <PasswordResetForm location={location} />
    </RegisterLayout>
  );
}

export default PasswordReset;