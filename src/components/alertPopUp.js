import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import PrimaryButton from './buttons/primaryButton';
import SecondaryButton from './buttons/secondaryButton';

const ModalWrapper = styled.div`
  .modal-footer {
    *:first-child {
      margin-right: auto;
    }
  }
`;

const AlertPopUp = ({ show, body, className = '', onCancel, onAccept}) => {
  const { t } = useTranslation();

  return (
    <Modal dialogClassName={className} show={show}>
      <ModalWrapper>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <SecondaryButton onClick={onCancel}>
            {t('cancel')}
          </SecondaryButton>
          <PrimaryButton onClick={onAccept}>
            {t('continue')}
          </PrimaryButton>
        </Modal.Footer>
      </ModalWrapper>
    </Modal>
  );
}

export default AlertPopUp;