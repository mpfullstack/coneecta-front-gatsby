import React from 'react';
import styled from 'styled-components';

const ActionButtons = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  .confirm-button {
    text-transform: uppercase;
    width: 100%;
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