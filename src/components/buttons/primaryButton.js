import React from 'react';
import { Button } from 'react-bootstrap';
import theme from '../../theme';
import styled from 'styled-components';

const PrimaryButtonWrapper = styled.div`
  .btn-primary {
    text-transform: uppercase;
    background-color: ${theme.primaryButtonColor};
    border-color: ${theme.primaryButtonColor};
    color: ${theme.primaryButtonTextColor};
    &:focus,
    &:active,
    &:not(:disabled):not(.disabled):active:focus,
    &.show>.btn-primary.dropdown-toggle:focus,
    &:not(:disabled):not(.disabled).active,
    &:not(:disabled):not(.disabled):active,
    &.show>.btn-primary.dropdown-toggle {
      background-color: ${theme.primaryButtonColor};
      box-shadow: 0 0 0 0.2rem ${theme.primaryButtonColor}80;
    }
    &.disabled, &:disabled {
      background-color: ${theme.primaryDisabledButtonColor};
      border-color: ${theme.primaryDisabledButtonColor};
    }
  }
`;

export default ({ children, ...rest }) =>  {
  return (
    <PrimaryButtonWrapper>
      <Button {...rest}>{children}</Button>
    </PrimaryButtonWrapper>
  )
}