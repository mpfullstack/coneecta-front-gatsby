import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import i18n from '../../locales/i18n';
import { useTranslation } from 'react-i18next';
import { Form as RBForm } from 'react-bootstrap';
import Form from '../../components/form/form';
import { passwordReset } from './loginSignUpSlice';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { validateRepeatPassword } from '../../helpers/validators';
import { isFormValid, isFieldValid } from '../../helpers/helpers';
import { Eye, EyeSlash } from '../../components/icons'
import CleanButton from '../../components/buttons/cleanButton';
import Query from '../../helpers/query';

function useTogglePasswordVisibility(initialState) {
  function togglePasswordVisibility(state, fieldName) {
    return {
      ...state,
      [fieldName]: state[fieldName] === 'password' ? 'text' : 'password'
    }
  }
  return React.useReducer(togglePasswordVisibility, initialState);
}

const mapDispatchToProps = { passwordReset };
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
  .form-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    & > div:first-child {
      width: 90%;
    }
    & > div:nth-child(2) {
      margin-top: 8px;
    }
  }
  .privacy-policy {
    &.invalid-feedback {
      display: inline-block;
    }
  }
`;

const PasswordResetForm = ({ passwordReset, passwordResetStatus, passwordResetErrors, location }) => {
  const { t } = useTranslation();
  const params = Query.getParams(location);
  const formData = {
    password: '',
    hash: params.hash,
    user: params.user
  };

  const [state, toggle] = useTogglePasswordVisibility({
    'password': 'password',
    'repeatPassword': 'password'
  });

  const requiredFields = ['password', 'repeatPassword'];
  const fieldValidators = {
    'password': (value, values) => validateRepeatPassword(value, values.repeatPassword),
    'repeatPassword': (value, values) => validateRepeatPassword(value, values.password),
  };

  function renderForm(formState, input) {
    function getError(name) {
      if (formState.errors[name]) {
        return t(formState.errors[name]);
      } else {
        return '';
      }
    }

    const createPasswordFieldOptions = (name, altName) => ({
      name,
      validate: (value, formData) => {
        let isValid = validateRepeatPassword(value, formData[altName]);
        if (isValid === undefined) {
          formState.setField(altName, value);
        }
        return isValid;
      }
    });

    const passwordFieldOptions = createPasswordFieldOptions('password', 'repeatPassword');
    const passwordField = state.password === 'password'
      ? input.password(passwordFieldOptions)
      : input.text(passwordFieldOptions);

    const repeatPasswordFieldOptions = createPasswordFieldOptions('repeatPassword', 'password');
    const repeatPasswordField = state.repeatPassword === 'password'
      ? input.password(repeatPasswordFieldOptions)
      : input.text(repeatPasswordFieldOptions);

    return (
      <FormWrapper>
        <RBForm.Row>
          <p className='text'>
            Introduce tu nueva contraseña.
          </p>
        </RBForm.Row>
        <RBForm.Row>
          <FormControl
            placeholder={t('password')}
            name={'password'}
            error={getError('password')}
            isValid={isFieldValid('password', formState, (value) => validateRepeatPassword(value, formState.values.repeatPassword))}
            {...passwordField} />
            <CleanButton onClick={(e) => {
              e.preventDefault();
              toggle('password');
            }}>
              {state.password === 'password' ? <EyeSlash /> : <Eye />}
            </CleanButton>
        </RBForm.Row>
        <RBForm.Row>
          <FormControl
            placeholder={t('repeatPassword')}
            name={'repeatPassword'}
            error={getError('repeatPassword')}
            isValid={isFieldValid('repeatPassword', formState, (value) => validateRepeatPassword(value, formState.values.password))}
            {...repeatPasswordField} />
          <CleanButton onClick={(e) => {
              e.preventDefault();
              toggle('repeatPassword');
            }}>
            {state.repeatPassword === 'password' ? <EyeSlash /> : <Eye />}
          </CleanButton>
        </RBForm.Row>

        <ActionButtons>
          <PrimaryButton type='submit' className='confirm-button'
            variant='primary' size='lg' disabled={!isFormValid(formState, requiredFields, fieldValidators)}>
            {passwordResetStatus === 'loading' ? t('sending') : t('send')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form
      formData={formData}
      renderForm={renderForm}
      errors={passwordResetErrors}
      onSubmit={(_, values) => passwordReset({ ...formData, password: values.password })} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);