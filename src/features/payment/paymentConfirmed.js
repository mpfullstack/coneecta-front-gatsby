import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import SEO from '../../components/seo';
import api from '../../api';
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
  .verifying-text {
    margin-top: 50px;
  }
`;

const PaymentConfirmed = ({ id }) => {
  // const { t } = useTranslation();

  const [paymentStatus, setPaymentStatus] = useState(() => {
    if (id) {
      return 'pending';
    } else {
      return 'accepted';
    }
  });

  const getPaymentStatus = useCallback((id, tries) => {
    return new Promise(resolve => {
      api.getPaymentStatus(id)
        .then(result => {
          if (tries > 0 && result.status === 'pending') {
            setTimeout(() => getPaymentStatus(id, tries-1), 4000);
          } else {
            resolve(result.status);
          }
        });
    });
  }, []);

  useEffect(() => {
    if (id) {
      const tries = 4;
      getPaymentStatus(id, tries)
        .then(status => setPaymentStatus(status));
    }
  }, [id, getPaymentStatus]);

  return (
    <PaymentConfirmedWrapper>
      {paymentStatus === 'accepted'
        ?
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
        : paymentStatus === 'pending'
          ?
          <Container>
            <SEO title='Verificando estado de la compra' />
            <Row className='justify-content-center text-center'>
              <Col xs='9'>
                <p className='verifying-text'>Estamos verificando el estado de la compra...</p>
              </Col>
            </Row>
          </Container>
          : paymentStatus === 'failed'
            ?
            <Container>
              <SEO title='Pago fallido' />
              <Row className='justify-content-center text-center'>
                <Col xs='9'>
                  <p className='verifying-text'>El pago no se ha podido completar correctamente.</p>
                </Col>
              </Row>
            </Container> : null}
    </PaymentConfirmedWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmed);