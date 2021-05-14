import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import { Form as RBForm } from 'react-bootstrap';
import Form from '../../components/form';
import { login } from './loginSignUpSlice';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { validateEmail, validatePassword } from '../../helpers/validators';

const mapDispatchToProps = { login };
const mapStateToProps = ({ booking, loginSignUp }) => {
  return {
    timezone: booking.timezone,
    timezones: booking.timezones,
    loginStatus: loginSignUp.loginStatus,
    loginErrors: loginSignUp.loginErrors.map(error => ({
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

const LoginForm = ({ login, loginStatus, loginErrors }) => {
  const { t } = useTranslation();
  const formData = {
    email: '',
    password: ''
  };

  const fieldValidators = {
    'email': validateEmail,
    'password': validatePassword
  }

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['email', 'password'];
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
          <FormControl placeholder={t('email')} name={'email'} error={getError('email')} isValid={isValid('email', validateEmail)}
            {...input.email({
              name: 'email',
              validate: validateEmail
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl placeholder={t('password')} name={'password'} error={getError('password')} isValid={isValid('password', validatePassword)}
            {...input.password({
              name: 'password',
              validate: validatePassword
            })} />
        </RBForm.Row>
        <ActionButtons>
          <PrimaryButton type='submit' className='confirm-button'
            variant='primary' size='lg' disabled={!isFormValid(formState)}>
            {loginStatus === 'loading' ? t('loggingmein') : t('logmein')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form
      formData={formData} renderForm={renderForm}
      isFormValid={isFormValid} errors={loginErrors}
      onSubmit={(e, values) => login({ ...values })} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);