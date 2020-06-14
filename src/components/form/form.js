import React from 'react';
import styled from 'styled-components';
import { useFormState } from 'react-use-form-state';
import theme from '../../theme';

const FormWrapper = styled.div`
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
  .form-group {
    margin-bottom: 0;
    min-height: 70px;
  }
`;

const Form = ({ onSubmit, formData, renderForm }) => {
  const [formState, input] = useFormState(formData);

  function handleSubmit(e) {
    if (typeof onSubmit === 'function') {
      onSubmit(e, formState.values);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // function disableForm() {
  //   if (formState.isPristine()) {
  //     return true;
  //   } else if( typeof isFormValid === 'function') {
  //     if (!isFormValid(formState)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        {renderForm(formState, input)}
      </form>
    </FormWrapper>
  );
};

export default Form;