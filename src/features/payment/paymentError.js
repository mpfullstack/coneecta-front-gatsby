import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import SEO from '../../components/seo';
import { ExclamationCircle } from '../../components/icons/icons';
import PaymentLayout from '../../components/paymentLayout';
import { Location } from '@reach/router';

const PaymentErrorWrapper = styled.div`
  .fa-exclamation-circle {
    margin-top: 20px;
    color: #e7b142;
    font-size: 50px;
  }
  .confirm-text {
    font-size: 20px;
    margin: 20px 0;
  }
  .text {
    margin-top: 40px;
  }
`;

export const PaymentError = ({ id }) => {
  return (
    <PaymentErrorWrapper>
      <Container>
        <SEO title='Pago fallido' />
        <Row className='justify-content-center text-center'>
          <Col>
            <ExclamationCircle />
            <p className='confirm-text'>
              <strong>¡Algo no ha ido bien!</strong>
              {id ? <span><br />({id})</span> : null}
            </p>
          </Col>
        </Row>
        <Row className='justify-content-center text-center'>
          <Col xs='9'>
            <p>Hemos identificado un problema con tu pago y no hemos podido confirmar tu reserva.</p>
          </Col>
        </Row>
        <Row className='justify-content-center text-center text'>
          <Col xs='2'></Col>
          <Col xs='8'>Si quieres que te ayudemos a resolverlo, utiliza nuestro formulario de contacto para
          contarnos tu caso y nuestro equipo se pondrá en contacto contigo lo antes posible.</Col>
          <Col xs='2'></Col>
        </Row>
      </Container>
    </PaymentErrorWrapper>
  );
}

const PaymentErrorLayout = ({ id }) => {
  // const { t } = useTranslation();

  return (
    <Location>
      {props => {
        return (
          <PaymentLayout {...props} showProfesionalProfile={false} showBooking={false}>
            <PaymentError id={id} />
          </PaymentLayout>
        );
      }}
    </Location>
  );
}

export default PaymentErrorLayout;