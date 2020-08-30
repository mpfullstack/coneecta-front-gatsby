import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const ActionButtons = styled.div`
  @media only screen and (max-width: ${theme.SIZES.M}) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  & > div {
    width: 100%;
  }
  .confirm-button {
    text-transform: uppercase;
    width: 50%;
    margin: 0 auto;
    display: block;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      width: 100%;
    }
    border-radius: 0;
  }
`;

export default ({ children }) => {
  return (
    <ActionButtons>
      {children}
    </ActionButtons>
  );
}