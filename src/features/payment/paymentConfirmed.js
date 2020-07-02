import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import SEO from '../../components/seo';
import { Container, Row, Col } from 'react-bootstrap';
import { CheckCircle, InfoCircle, Envelope } from '../../components/icons/icons';

const mapDispatchToProps = {};
const mapStateToProps = ({ profile, payment }) => {
  return {
    profile,
    payment
  }
}

const PaymentConfirmedWrapper = styled.div`
  .fa-check-circle {
    margin-top: 20px;
    color: #79bc79;
    font-size: 50px;
  }
  .confirm-text {
    font-size: 20px;
    margin: 20px 0;
  }
  .icon-text {
    margin-top: 40px;
    align-items: center;
    .svg-inline--fa {
      font-size: 36px;
    }
  }
`;

const PaymentConfirmed = ({ id }) => {
  // const { t } = useTranslation();

  return (
    <PaymentConfirmedWrapper>
      <Container>
        <SEO title='Pago confirmado' />
        <Row className='justify-content-center text-center'>
          <Col>
            <CheckCircle />
            <p className='confirm-text'><strong>Compra confirmada<br />({id})</strong></p>
          </Col>
        </Row>
        <Row className='justify-content-center text-center'>
          <Col xs='9'>
            <p>Tu reserva ha sido registrada correctamente y ya hemos solicitado a Javier Marrero su confirmación.</p>
          </Col>
        </Row>
        <Row className='icon-text'>
          <Col xs='1'></Col>
          <Col xs='2'><Envelope /></Col>
          <Col xs='8'>Hemos enviado a tu correo electrónico un resumen con todos los detalles de tu reserva.</Col>
        </Row>
        <Row className='icon-text'>
          <Col xs='1'></Col>
          <Col xs='2'><InfoCircle /></Col>
          <Col xs='8'>Recuerda que desde tu zona de usuario tambien puedes consultar toda esta información siempre que lo necesites.</Col>
        </Row>
      </Container>
    </PaymentConfirmedWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmed);