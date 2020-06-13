import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { formatMoney } from '../../helpers/helpers';

const Modalities = styled.div`
  .modality {
    margin: 10px 0;
    cursor: pointer;
    .modality-item {
      white-space: nowrap;
      text-align: right;
      padding: 5px 15px;
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
      <Col className='modality-item' xs='5'>{t(modality.type)}</Col>
      <Col className='modality-item' xs='2'>{modality.duration} min</Col>
      <Col className='modality-item' xs='5'>{modality.credits}cr. ({formatMoney(modality.credits_in_euros)})</Col>
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