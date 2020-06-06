import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import CardWrapper from './card.style';
import { Edit } from '../icons';

const DateTimeCardWrapper = styled.div`
  .card-body {
    text-align: center;
  }
`;

const DateTimeCard = ({ date, time, timezone, onClick }) => {
  return (
    <DateTimeCardWrapper>
      <CardWrapper>
        <Card onClick={onClick}>
          <Card.Header>
            <Card.Title>{date}</Card.Title>
            <Edit />
          </Card.Header>
          <Card.Body>
            {time} {timezone}
          </Card.Body>
        </Card>
      </CardWrapper>
    </DateTimeCardWrapper>
  );
}

export default DateTimeCard;