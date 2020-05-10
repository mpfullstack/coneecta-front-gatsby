import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Edit } from '../icons';
import theme from '../../theme';

const ServiceCardWrapper = styled.div`
  .card {
    margin: 10px 0 15px;
    border: none;
    .card-header {
      padding: 5px;
      background-color: ${theme.backgroundCardHeaderColor};
      color: ${theme.textCardHeaderColor};
      .card-title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 0;
      }
      .fa-edit {
        position: absolute;
        top: 7px;
        right: 6px;
      }
    }
    .card-body {
      padding: 5px 10px;
      font-size: 16px;
      border: 1px solid ${theme.borderCardColor};
      border-radius: 0 0 5px 5px;
    }
  }
`;

const ServiceCard = ({ serviceName, modality, onClick }) => {
  return (
    <ServiceCardWrapper>
      <Card onClick={onClick}>
        <Card.Header>
          <Card.Title>{serviceName}</Card.Title>
          <Edit />
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs='6'>{modality.type}</Col>
            <Col>{modality.duration}</Col>
            <Col>{modality.price}</Col>
          </Row>
        </Card.Body>
      </Card>
    </ServiceCardWrapper>
  );
}

export default ServiceCard;