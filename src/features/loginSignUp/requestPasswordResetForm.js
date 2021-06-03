import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import { Form as RBForm } from 'react-bootstrap';
import Form from '../../components/form/form';
import { requestPasswordReset } from './loginSignUpSlice';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { validateEmail, validatePassword } from '../../helpers/validators';
import { resetPasswordUrl } from '../../api/urls';

const mapDispatchToProps = { requestPasswordReset };
const mapStateToProps = ({ loginSignUp }) => {
  return {
    passwordResetStatus: loginSignUp.passwordResetStatus,
    passwordResetErrors: loginSignUp.passwordResetErrors.map(error => ({
      field: error.field,
      error: i18n.t(error.error)
    }))
  }
}

const FormWrapper = styled.div`
  padding-bottom: 100px;
  .privacy-policy {
    &.invalid-feedback {
      display: inline-block;
    }
  }
`;

const RequestPasswordResetForm = ({ requestPasswordReset, passwordResetStatus, passwordResetErrors }) => {
  const { t } = useTranslation();
  const formData = {
    email: ''
  };

  const fieldValidators = {
    'email': validateEmail
  }

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['email'];
    let requiredValidation = requiredFields.every(fieldname => {
      if (fieldname in formState.errors) {
        return false;
      } else if (fieldname in fieldValidators && typeof fieldValidators[fieldname] === 'function') {
        return fieldValidators[fieldname](formState.values[fieldname]) === undefined;
      } else {
        return false;
      }
    });
    return valid && requiredValidation;
  }

  function renderForm(formState, input) {
    function isValid(name, valdidateFunc) {
      if (formState.isPristine()) {
        return {};
      } else {
        if (name in formState.errors) {
          return {
            isInvalid: true,
            isValid: false
          };
        } else if (typeof valdidateFunc === 'function') {
          let valid = valdidateFunc(formState.values[name]);
          return {
            isInvalid: valid !== undefined,
            isValid: valid === undefined
          };
        } else {
          return {}
        }
      }
    }

    function getError(name) {
      if (formState.errors[name]) {
        return t(formState.errors[name]);
      } else {
        return '';
      }
    }

    return (
      <FormWrapper>
        <RBForm.Row>
          <p className='text'>
            Introduce tu correo electrónico y te mandadremos un e-mail para poder resetear tu contraseña.
          </p>
        </RBForm.Row>
        <RBForm.Row>
          <FormControl placeholder={t('email')} name={'email'} error={getError('email')} isValid={isValid('email', validateEmail)}
            {...input.email({
              name: 'email',
              validate: validateEmail
            })} />
        </RBForm.Row>
        <ActionButtons>
          <PrimaryButton type='submit' className='confirm-button'
            variant='primary' size='lg' disabled={!isFormValid(formState)}>
            {passwordResetStatus === 'loading' ? t('sending') : t('send')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form
      formData={formData} renderForm={renderForm}
      isFormValid={isFormValid} errors={passwordResetErrors}
      onSubmit={(e, values) => requestPasswordReset({ ...values })} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPasswordResetForm);