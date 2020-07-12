import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import theme from '../../theme';

const CreditsWrapper = styled.div`
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  margin-bottom: 6px;
  .credits {
    padding: 5px 10px;
    align-items: baseline;
    .text {
      font-size: 16px;
    }
    .value {
      font-size: 20px;
      font-weight: bold;
      text-align: right;
    }
  }
`;

const CreditItem = ({ text, value }) => {
  return (
    <Row className='credits'>
      <Col xs='10' className='text'>{text}</Col>
      <Col xs='2' className='value'>{value}</Col>
    </Row>
  );
}

const Credits = ({ toPay, available }) => {
  return (
    <CreditsWrapper>
      <CreditItem text='Créditos necesarios para la reserva' value={toPay} />
      <CreditItem text='Créditos disponibles en tu cuenta' value={available} />
    </CreditsWrapper>
  );
};

export default Credits;