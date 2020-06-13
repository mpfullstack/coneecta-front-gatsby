import React from 'react';
import { useFormState } from 'react-use-form-state';

export default ({ onSubmit, formData, renderForm, isFormValid }) => {
  const [formState, input] = useFormState(formData);

  function handleSubmit(e) {
    onSubmit(formState.values);
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      {renderForm(formState, input)}
    </form>
  );
};