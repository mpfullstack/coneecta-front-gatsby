import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.div`
  button {
    width: auto;
    height: auto;
    background-color: transparent;
    border: none;
    color: inherit;
    border-radius: inherit;
    box-shadow: none;
    transition: none;
    padding: 0;
    margin: 0;
  }
`;

const CleanButton = ({ children, onClick, ...rest }) => {
  return (
    <ButtonWrapper>
      <button onClick={e => onClick(e)} {...rest}>{children}</button>
    </ButtonWrapper>
  );
}

CleanButton.propTypes = {
  onClick: PropTypes.func
}

export default CleanButton;
