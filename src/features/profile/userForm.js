import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Autocomplete from 'react-google-autocomplete';
import { useTranslation } from 'react-i18next';
import { Form as RBForm, Col } from 'react-bootstrap';
import { saveProfile } from './profileSlice';
import Form from '../../components/form';
import FormControl from '../../components/form/formControl';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { adaptTimeZonesToArray, getCountryNameByCode } from '../../helpers/data';
import { validateName, validateRequired } from '../../helpers/validators';

const mapDispatchToProps = { saveProfile };
const mapStateToProps = ({ global, profile, booking }) => {
  const { name, email, timezone, locations } = profile.details || {};
  let location = {};
  if (locations && locations.length) {
    location = locations[0];
  }
  const formData = {
    name,
    email,
    timezone,
    ...location,
    country: location ? getCountryNameByCode(global.countries, location.country_code) : ''
  };
  return {
    formData,
    formStatus: profile.formStatus,
    timezones: booking.timezones
  }
}

const FormWrapper = styled.div`
  padding-bottom: 100px;
  .form-label {
    margin-top: 15px;
  }
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
  .google-places-container {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const UserForm = ({ formData, timezones, formStatus, saveProfile }) => {
  const { t } = useTranslation();

  const fieldValidators = {
    'name': validateName,
    'timezone': validateName,
    'street_name': validateRequired,
    'street_number': validateRequired,
    'province': validateRequired,
    'country': validateRequired,
    'postal_code': validateRequired,
    'city': validateRequired,
    'floor': validateRequired,
    'door': validateRequired
  };

  function isFormValid(formState) {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = [
      'name', 'timezone', 'street_name', 'street_number', 'province', 'country',
      'postal_code', 'city', 'floor', 'door'
    ];
    let requiredValidation = requiredFields.every(fieldname => {
      if (fieldname in formState.errors && formState.errors[fieldname] !== undefined) {
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
        if (name in formState.errors && formState.errors[name] !== undefined) {
          return {
            isInvalid: true,
            isValid: false
          };
        } else if (name in formState.errors && formState.errors[name] === undefined) {
            return {
              isInvalid: false,
              isValid: true
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

    function findAttribute(items, type, attribute = 'long_name') {
      if (items) {
        const foundItem = items.find(item => {
          if (item.types.includes(type)) {
            return item;
          } else {
            return null;
          }
        });
        if (foundItem) {
          return foundItem[attribute];
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    function setAddressValues(place) {
      const streetName = findAttribute(place.address_components, 'route');
      const streetNumber = findAttribute(place.address_components, 'street_number');
      const city = findAttribute(place.address_components, 'locality');
      const province = findAttribute(place.address_components, 'administrative_area_level_2');
      const postalCode = findAttribute(place.address_components, 'postal_code');
      const country = findAttribute(place.address_components, 'country');
      const countryCode = findAttribute(place.address_components, 'country', 'short_name');
      formState.setField('street_name', streetName);
      formState.setField('street_number', streetNumber);
      formState.setField('city', city);
      formState.setField('province', province);
      formState.setField('postal_code', postalCode);
      formState.setField('country', country);
      formState.setField('country_code', countryCode);
      formState.setField('location_lat', place.geometry.location.lat());
      formState.setField('location_long', place.geometry.location.lng());
    }

    return (
      <FormWrapper>
        <RBForm.Row>
          <FormControl label={t('name')} name={'name'} error={getError('name')} isValid={isValid('name', validateName)}
            {...input.text({
              name: 'name',
              validate: validateName
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl label={t('email')} name={'email'} disabled={true}
            {...input.text({
              name: 'email'
            })} />
        </RBForm.Row>
        <RBForm.Row>
          <FormControl label={t('Timezone')} as='select' name={'timezone'} error={getError('timezone')} isValid={isValid('timezone')}
            {...input.select('timezone')}>
              {adaptTimeZonesToArray(timezones, { value: null, label: t('Select the timezone') }).map(
                tz => <option key={tz.value} value={tz.value}>{tz.label}</option>
              )}
          </FormControl>
        </RBForm.Row>
        <RBForm.Row className='google-places-container'>
          <label className='form-label'>{t('typeAddressToSearch')}</label>
          <Autocomplete
            onPlaceSelected={(place) => {
              setAddressValues(place);
            }}
            types={['address']}
            placeholder={t('typeYourAddress')}
            className='form-control'
          />
        </RBForm.Row>
        <RBForm.Row>
          <Col xs='8'>
            <FormControl label={t('streetName')} name={'street_name'} error={getError('street_name')}
              isValid={isValid('street_name')}
              {...input.text({
                name: 'street_name',
                validate: validateRequired
              })} />
          </Col>
          <Col xs='4'>
            <FormControl label={t('streetNumber')} name={'street_number'} error={getError('street_number')}
              isValid={isValid('street_number')}
              {...input.text({
                name: 'street_number',
                validate: validateRequired
              })} />
          </Col>
        </RBForm.Row>
        <RBForm.Row>
          <Col xs='6'>
            <FormControl label={t('province')} name={'province'} error={getError('province')}
              isValid={isValid('province')}
              {...input.text({
                name: 'province',
                validate: validateRequired
              })} />
          </Col>
          <Col xs='6'>
            <FormControl label={t('country')} name={'country'} error={getError('country')}
              isValid={isValid('country')}
              {...input.text({
                name: 'country',
                validate: validateRequired
              })} />
          </Col>
        </RBForm.Row>
        <RBForm.Row>
          <Col xs='4'>
            <FormControl label={t('postalCode')} name={'postal_code'} error={getError('postal_code')}
              isValid={isValid('postal_code')}
              {...input.text({
                name: 'postal_code',
                validate: validateRequired
              })} />
          </Col>
          <Col xs='8'>
            <FormControl label={t('city')} name={'city'} error={getError('city')}
              isValid={isValid('city')}
              {...input.text({
                name: 'city',
                validate: validateRequired
              })} />
          </Col>
        </RBForm.Row>
        <RBForm.Row>
          <Col xs='4'>
            <FormControl label={t('floor')} name={'floor'} error={getError('floor')}
              isValid={isValid('floor')}
              {...input.text({
                name: 'floor',
                validate: validateRequired
              })} />
          </Col>
          <Col xs='4'>
            <FormControl label={t('door')} name={'door'} error={getError('door')}
              {...input.text({
                name: 'door'
              })} />
          </Col>
        </RBForm.Row>
        <RBForm.Row>
          <FormControl label={t('comments')} name={'extra'} as='textarea' {...input.textarea({
            name: 'extra'
          })} />
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