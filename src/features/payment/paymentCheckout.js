import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Location } from '@reach/router';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const mapDispatchToProps = {};
const mapStateToProps = ({ payment }) => {
  return {
    checkoutDetails: payment.checkoutDetails
  }
}

const PaymentCheckout = ({ checkoutDetails }) => {
  const { t } = useTranslation();
  // TODO: Build the form to post the checkout details to tpv url
  // useEffect
  return (
    <Location>
      {props => {
        return (
          <Row>
            <Col>Procesando...</Col>
          </Row>
        );
      }}
    </Location>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCheckout);