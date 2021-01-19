import React from 'react';
import styled from 'styled-components';
import { Col, Form as RBForm } from 'react-bootstrap';
import theme from '../../theme';

export const FormControlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .form-control:focus {
      border-color: ${theme.inputBorderColorFocus};
      box-shadow: 0 0 0 0.2rem ${theme.inputBoxShadowColorFocus};
  }
  .form-control.is-valid:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40,167,69,.25);
  }
  .form-control.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
  }
`;

export default ({ label, placeholder, name, error, isValid, as = 'input', children = null, ...rest}) => {
  return (
    <FormControlWrapper>
      <RBForm.Group as={Col} md='4' lg='8' controlId={name}>
        {label ? <RBForm.Label>{label}</RBForm.Label> : null}
        <RBForm.Control placeholder={placeholder} {...isValid} as={as} {...rest}>{children}</RBForm.Control>
        {isValid ? <RBForm.Control.Feedback type={isValid.isValid ? 'valid' : 'invalid'}>
          {error}
        </RBForm.Control.Feedback>
        : null}
      </RBForm.Group>
    </FormControlWrapper>
  );
}