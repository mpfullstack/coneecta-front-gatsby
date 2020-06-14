import React from 'react';
import { Col, Form as RBForm } from 'react-bootstrap';

export default ({ label, placeholder, name, error, isValid, as = 'input', children = null, ...rest}) => {
  return (
    <RBForm.Group as={Col} md='4' controlId={name}>
      {label ? <RBForm.Label>{label}</RBForm.Label> : null}
      <RBForm.Control placeholder={placeholder} {...isValid} as={as} {...rest}>{children}</RBForm.Control>
      <RBForm.Control.Feedback type={isValid.isValid ? 'valid' : 'invalid'}>
        {error}
      </RBForm.Control.Feedback>
    </RBForm.Group>
  );
}