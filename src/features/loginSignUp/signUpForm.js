import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
const mapStateToProps = state => {
  return {
    timezone: state.booking.timezone,
    timezones: state.booking.timezones,
    signUpStatus: state.loginSignUp.signUpStatus
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

const SignUpForm = ({ signUp, timezones, timezone, signUpStatus }) => {
  const { t } = useTranslation();
  const formData = {
    name: '',
    email: '',
    password: '',
    timezone,
    newsletter_subscriber: false,
    privacy_policy: false
  };

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['name', 'email', 'password', 'privacy_policy'];
    let requiredValidation = requiredFields.every(fieldname => {
      return (fieldname in formState.validity) && formState.validity[fieldname];
    });
    return valid && requiredValidation;
  }

  function renderForm(formState, input) {
    function isValid(name) {
      if (formState.isPristine()) {
        return {};
      } else {
        let valid = formState.validity[name];
        return {
          isInvalid: !valid,
          isValid: valid
        };
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
          <FormControl placeholder={t('name')} name={'name'} error={getError('name')} isValid={isValid('name')}
            {...input.text({
              name: 'name',
              validate: validateName
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl placeholder={t('email')} name={'email'} error={getError('email')} isValid={isValid('email')}
            {...input.email({
              name: 'email',
              validate: validateEmail
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl placeholder={t('password')} name={'password'} error={getError('password')} isValid={isValid('password')}
            {...input.password({
              name: 'password',
              validate: validatePassword
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl as='select' name={'timezone'} error={getError('timezone')} isValid={isValid('password')}
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
              name: 'privacy_policy',
              validate: validatePrivacyPolicy
            })}
            id='privacy_policy'
            label={<div>{t('accept')} <a href="http://coneecta.com">{t('privacyPolicy')}</a> {t('ofConeecta')}</div>} />
          {!formState.isPristine() && !isValid('privacy_policy').isValid ?
            <span className='privacy-policy invalid-feedback'>{t('mustAcceptPrivacyPolicy')}</span> : null}
        </RBForm.Row>
        <ActionButtons>
          <PrimaryButton className='confirm-button' variant='primary' size='lg' disabled={!isFormValid(formState)}
            onClick={() => {
                signUp({
                  ...formState.values,
                  privacy_policy: formState.values.privacy_policy ? 1 : 0,
                  newsletter_subscriber: formState.values.newsletter_subscriber ? 1 : 0
                })
              }
            }>
              {signUpStatus === 'loading' ? t('signingmeup') : t('signmeup')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form formData={formData} renderForm={renderForm} isFormValid={isFormValid} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);