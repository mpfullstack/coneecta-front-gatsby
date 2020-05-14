import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Modalities = styled.div`
  .modality {
    margin: 10px 0;
    .modality-item {
      white-space: nowrap;
      text-align: right;
      padding: 0 5px;
      &:first-child {
        text-align: left;
      }
    }
  }
`;

export const Modality = ({ modality, onClick }) => {
  const { t } = useTranslation();
  return (
    <Row className='modality' onClick={onClick}>
      <Col className='modality-item' xs='6'>{t(modality.type)}</Col>
      <Col className='modality-item' xs='2'>{modality.duration} min</Col>
      <Col className='modality-item' xs='4'>{modality.credits}cr{/*<br />({modality.credits_in_euros}€)*/}</Col>
    </Row>
  );
}

const ServiceModalities = ({ serviceId, modalities, onSelect }) => {
  return (
    <Modalities>
      {modalities && modalities.map(modality => {
        return (
          <Modality modality={modality} key={`${serviceId}-${modality.type}`} className='modality'
            onClick={e => onSelect(e, {serviceId, modalityType: modality.type})} />
        );
      })}
    </Modalities>
  );
}

export default ServiceModalities;