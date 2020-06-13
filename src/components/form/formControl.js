import React from 'react';
import { Col, Form as RBForm } from 'react-bootstrap';

export default ({ label, name, error, isValid, ...rest}) => {
  return (
    <RBForm.Group as={Col} md='4' controlId={name}>
      {/* <RBForm.Label></RBForm.Label> */}
      <RBForm.Control placeholder={label} {...isValid} {...rest} />
      <RBForm.Control.Feedback type={isValid.isValid ? 'valid' : 'invalid'}>
        {error}
      </RBForm.Control.Feedback>
    </RBForm.Group>
  );
}