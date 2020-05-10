import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Modalities = styled.div`
  .modality {
    margin: 10px 0;
  }
`;

const ServiceModalities = ({ serviceId, modalities, onSelect }) => {
  const { t } = useTranslation();
  return (
    <Modalities>
      {modalities && modalities.map(modality => {
        return (
          <Row key={`${serviceId}-${modality.type}`} className='modality'
            onClick={e => onSelect(e, {serviceId, modalityType: modality.type})}>
              <Col xs='7'>{t(modality.type)}</Col>
              <Col>{modality.duration}</Col>
              <Col>{modality.price}</Col>
          </Row>
        );
      })}
    </Modalities>
  );
}

export default ServiceModalities;