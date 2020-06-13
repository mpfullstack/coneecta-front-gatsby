import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button, Form as RBForm } from 'react-bootstrap';
import Form from '../../components/form';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import { validateEmail, validatePassword } from '../../helpers/validators';

const FormWrapper = styled.div`
  padding-bottom: 100px;
`;

export default () => {
  const formData = {
    email: '',
    password: ''
  };

  const { t } = useTranslation();

  function handleSubmit(e) {
    // onSubmit(formState.values);
    // const values = formState.values;
    e.preventDefault();
    e.stopPropagation();
  }

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['email', 'password'];
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
          <FormControl label={t('email')} name={'email'} error={getError('email')} isValid={isValid('email')}
            {...input.email({
              name: 'email',
              validate: validateEmail
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl label={t('password')} name={'password'} error={getError('password')} isValid={isValid('password')}
            {...input.password({
              name: 'password',
              validate: validatePassword
            })} />
        </RBForm.Row>
        {!formState.isPristine() && isFormValid(formState) ?
          <ActionButtons>
            <Button type='submit' className='confirm-button'>Login</Button>
          </ActionButtons>
          : null}
      </FormWrapper>
    );
  }

  return (
    <Form onSubmit={handleSubmit} formData={formData} renderForm={renderForm} isFormValid={isFormValid} />
  );
};