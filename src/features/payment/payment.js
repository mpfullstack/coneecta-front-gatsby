import React from 'react';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import PaymentLayout from '../../components/paymentLayout';
import Credits from './credits';
import BuyCredits from './buyCredits';
import SEO from "../../components/seo";

const Payment = () => {
  return (
    <Location>
      {props => {
        return (
          <PaymentLayout {...props}>
            <SEO title="Payment" />
            <Credits toPay={80} available={100} />
            <BuyCredits />
            <Row>
              <Col>
                Al hacer clic en <strong>pagar</strong> procesaremos tu reserva descontando los créditos del saldo
                disponible en tu cuenta.
              </Col>
            </Row>
          </PaymentLayout>
        );
      }}
    </Location>
  );
}

export default Payment;