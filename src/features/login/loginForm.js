import React from 'react';
import styled from 'styled-components';
import { validateEmail, validatePassword } from '../../helpers/validators';
import { useFormState } from 'react-use-form-state';
import { Col, Form, Button } from 'react-bootstrap';
import ActionButtons from '../../components/buttons/actionButtons';

const FormWrapper = styled.div`
  padding-bottom: 100px;
`;

export default ({ onSubmit, formData }) => {
  const [formState, { email, password }] = useFormState(formData);

  function handleSubmit(e) {
    // onSubmit(formState.values);
    const values = formState.values;
    debugger;
    e.preventDefault();
    e.stopPropagation();
  }

  function isFormValid() {
    let valid =  Object.keys(formState.validity).every(key => {
      return formState.validity[key];
    });
    let requiredFields = ['email', 'password'];
    let requiredValidation = requiredFields.every(fieldname => {
      return (fieldname in formState.validity) && formState.validity[fieldname];
    });
    return valid && requiredValidation;
  }

  function disableForm() {
    if (formState.isPristine()) {
      return true;
    } else if (!isFormValid()) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <FormWrapper>
      <Form validated={!formState.isPristine()} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md='4' controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control required placeholder='email'
              {...email({
                name: 'email',
                validate: validateEmail
              })}
            />
            <Form.Control.Feedback type={!formState.validity['email'] ? 'invalid' : ''}>
              {formState.errors['email']}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md='4' controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control required placeholder='password'
              {...password({
                name: 'password',
                validate: validatePassword
              })}
            />
            <Form.Control.Feedback type={!formState.validity['password'] ? 'invalid' : ''}>
              {formState.errors['password']}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {isFormValid() ?
          <ActionButtons>
            <Button type='submit' className='confirm-button'>Login</Button>
          </ActionButtons>
          : null}
      </Form>
    </FormWrapper>
  );
};