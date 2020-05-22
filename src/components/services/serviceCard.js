import React from 'react';
import { Card } from 'react-bootstrap';
import { Edit } from '../icons';
import { Modality } from './serviceModalities';
import CardWrapper from './card.style';

const ServiceCard = ({ serviceName, modality, onClick }) => {
  return (
    <CardWrapper>
      <Card onClick={onClick}>
        <Card.Header>
          <Card.Title>{serviceName}</Card.Title>
          <Edit />
        </Card.Header>
        <Card.Body>
          <Modality modality={modality} />
        </Card.Body>
      </Card>
    </CardWrapper>
  );
}

export default ServiceCard;