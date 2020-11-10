import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import { Form as RBForm } from 'react-bootstrap';
import Form from '../../components/form';
import { signUp } from './loginSignUpSlice';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { adaptTimeZonesToArray } from '../../helpers/data';
import { validateName, validateEmail, validatePassword, validatePrivacyPolicy } from '../../helpers/validators';

const mapDispatchToProps = { signUp };
const mapStateToProps = ({ booking, loginSignUp }) => {
  return {
    timezone: booking.timezone,
    timezones: booking.timezones,
    signUpStatus: loginSignUp.signUpStatus,
    signUpErrors: loginSignUp.signUpErrors.map(error => ({
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
  .form-check-label {
    a {
      text-decoration: underline;
    }
  }
`;

const SignUpForm = ({ signUp, timezones, timezone, signUpStatus, signUpErrors }) => {
  const { t } = useTranslation();
  const formData = {
    name: '',
    email: '',
    password: '',
    timezone,
    newsletter_subscriber: false,
    privacy_policy: false
  };

  const fieldValidators = {
    'name': validateName,
    'email': validateEmail,
    'password': validatePassword,
    'privacy_policy': validatePrivacyPolicy
  }

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['name', 'email', 'password', 'privacy_policy'];
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
          <FormControl placeholder={t('name')} name={'name'} error={getError('name')} isValid={isValid('name', validateName)}
            {...input.text({
              name: 'name',
              validate: validateName
            })} />
        </RBForm.Row>
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
        <RBForm.Row>
          <FormControl as='select' name={'timezone'} error={getError('timezone')} isValid={isValid('timezone')}
            {...input.select('timezone')}>
              {adaptTimeZonesToArray(timezones, { value: null, label: t('Select the timezone') }).map(
                tz => <option key={tz.value} value={tz.value}>{tz.label}</option>
              )}
          </FormControl>
        </RBForm.Row>
        <RBForm.Row>
          <RBForm.Check
            {...input.checkbox({ name: 'newsletter_subscriber' })}
            id='newsletter_subscriber' label={t('newsletterSignUp')} />
        </RBForm.Row>
        <RBForm.Row>
          <RBForm.Check {...input.checkbox({
              name: 'privacy_policy'
            })}
            id='privacy_policy'
            label={<div>{t('accept')} <a href="http://coneecta.com">{t('privacyPolicy')}</a> {t('ofConeecta')}</div>} />
          {!formState.isPristine() && !isValid('privacy_policy', validatePrivacyPolicy).isValid ?
            <span className='privacy-policy invalid-feedback'>{t('mustAcceptPrivacyPolicy')}</span> : null}
        </RBForm.Row>
        <ActionButtons>
          <PrimaryButton type='submit' className='confirm-button' variant='primary'
          size='lg' disabled={!isFormValid(formState)}>
              {signUpStatus === 'loading' ? t('signingmeup') : t('signmeup')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form
      formData={formData}
      renderForm={renderForm}
      isFormValid={isFormValid}
      errors={signUpErrors}
      onSubmit={
        (e, values) => signUp({
          ...values,
          privacy_policy: values.privacy_policy ? 1 : 0,
          newsletter_subscriber: values.newsletter_subscriber ? 1 : 0
        })
      } />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);