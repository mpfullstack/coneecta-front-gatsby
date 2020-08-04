import React from 'react';
import { Button } from 'react-bootstrap';
import theme from '../../theme';
import styled from 'styled-components';

const SecondaryButtonWrapper = styled.div`
  .btn-primary {
    text-transform: uppercase;
    background-color: ${theme.secondaryButtonColor};
    border-color: ${theme.secondaryButtonColor};
    color: ${theme.secondaryButtonTextColor};
    &:focus,
    &:active,
    &:not(:disabled):not(.disabled):active:focus,
    &.show>.btn-primary.dropdown-toggle:focus,
    &:not(:disabled):not(.disabled).active,
    &:not(:disabled):not(.disabled):active,
    &.show>.btn-primary.dropdown-toggle {
      background-color: ${theme.secondaryButtonColor};
      box-shadow: 0 0 0 0.2rem ${theme.secondaryButtonColor}80;
    }
    &.disabled, &:disabled {
      background-color: ${theme.secondaryDisabledButtonColor};
      border-color: ${theme.secondaryDisabledButtonColor};
    }
  }
`;

export default ({ children, ...rest }) =>  {
  return (
    <SecondaryButtonWrapper>
      <Button {...rest}>{children}</Button>
    </SecondaryButtonWrapper>
  )
}