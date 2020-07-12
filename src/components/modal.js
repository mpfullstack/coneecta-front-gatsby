import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 100000;
`;

export default ({ children }) => {
  const el = document.createElement('div');
  el.id = 'modal-alert';

  useEffect(
    () => {
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    },
    [el]
  );


  return ReactDOM.createPortal(<ModalWrapper>{children}</ModalWrapper>, el);
}