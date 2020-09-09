import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Form as RBForm } from 'react-bootstrap';
import { saveProfile } from './profileSlice';
import Form from '../../components/form';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { adaptTimeZonesToArray } from '../../helpers/data';
import { validateName } from '../../helpers/validators';

const mapDispatchToProps = { saveProfile };
const mapStateToProps = ({ profile, booking }) => {
  const { name, email, timezone } = profile.details || {};
  const formData = {
    name,
    email,
    timezone
  };
  return {
    formData,
    formStatus: profile.formStatus,
    timezones: booking.timezones
  }
}

const FormWrapper = styled.div`
  padding-bottom: 100px;
  .privacy-policy {
    &.invalid-feedback {
      display: inline-block;
    }
  }
  .form-data-email {
    margin: 0 0 25px 15px;
  }
  .form-check-label {
    a {
      text-decoration: underline;
    }
  }
`;

const UserForm = ({ formData, timezones, formStatus, saveProfile }) => {
  const { t } = useTranslation();

  const fieldValidators = {
    'name': validateName
  }

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['name'];
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
          <p className='form-data-email'>{formData.email}</p>
        </RBForm.Row>
        <RBForm.Row>
          <FormControl as='select' name={'timezone'} error={getError('timezone')} isValid={isValid('timezone')}
            {...input.select('timezone')}>
              {adaptTimeZonesToArray(timezones, { value: null, label: t('Select the timezone') }).map(
                tz => <option key={tz.value} value={tz.value}>{tz.label}</option>
              )}
          </FormControl>
        </RBForm.Row>
        <ActionButtons>
          <PrimaryButton className='confirm-button' variant='primary' size='lg' disabled={!isFormValid(formState)}
            onClick={() => saveProfile({ ...formState.values })}>
              {formStatus === 'loading' ? t('saving') : t('save')}
          </PrimaryButton>
        </ActionButtons>
      </FormWrapper>
    );
  }

  return (
    <Form formData={formData} renderForm={renderForm} isFormValid={isFormValid} errors={[]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);