import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const MenuIconWrapper = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  & span {
    transition: .3s ease;
  }
  &:hover span {
    width: 100%;
    transition: .3s ease;
  }
  &.opened {
    height: 9px;
    span {
      display: none;
      width: 100%;
    }
    span:first-child {
      display: block;
      transition: .3s ease;
      transform: translate(0px, 3px) rotate(45deg) !important;
    }
    span:last-child {
      display: block;
      transition: .3s ease;
      transform: translate(0px, -5px) rotate(-45deg) !important;
    }
  }
`;

const Line = styled.span`
  width: 96%;
  height: 3px;
  background-color: ${theme.textColor};
  position: absolute;
  top: 46%;
  left: 0;
  border-radius: 2px;
  &:first-child {
    top: 5%;
  }
  &:last-child {
    top: 88%;
  }
`;

// To close
// translate(1px, 3px) rotate(45deg)

export default ({ state }) => {
  return (
    <MenuIconWrapper className={state || 'closed'}>
      <Line />
      <Line />
      <Line />
    </MenuIconWrapper>
  );
}