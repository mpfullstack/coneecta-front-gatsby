import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';

const mapDispatchToProps = {};
const mapStateToProps = ({ payment }) => {
  return {
    url: payment.checkoutDetails.url
  }
}

const PaymentCheckoutWrapper = styled.div`
  .message {
    margin-top: 10%;
    font-size: 20px;
    text-align: center;
  }
  .message-info {
    font-size: 18px;
    text-align: center;
    width: 90%;
    margin: 10% auto 0 auto;
  }
  .form {
    display: flex;
    justify-content: center;
    .submit {
      padding: 8px 20px;
      margin-top: 20px;
      text-transform: uppercase;
      font-weight: bold;
      background-color: ${theme.primaryButtonColor};
      border-color: ${theme.primaryButtonColor};
      color: ${theme.primaryButtonTextColor};
      &:focus,
      &:active,
      &:not(:disabled):not(.disabled):active:focus,
      &.show>.btn-primary.dropdown-toggle:focus,
      &:not(:disabled):not(.disabled).active,
      &:not(:disabled):not(.disabled):active,
      &.show>.btn-primary.dropdown-toggle {
        background-color: ${theme.primaryButtonColor};
        box-shadow: 0 0 0 0.2rem ${theme.primaryButtonColor}80;
      }
      &.disabled, &:disabled {
        background-color: ${theme.primaryDisabledButtonColor};
        border-color: ${theme.primaryDisabledButtonColor};
      }
    }
  }
`;

const PaymentCheckout = ({ url }) => {
  const { t } = useTranslation();

  // Redirect user to tpv url
  useEffect(() => {
    setTimeout(() => window.location.href = url, 250);
    // NOTE: For testing purpose
    // window.location.href = '/profile/payment_ok/30';
  }, [url]);

  return (
    <PaymentCheckoutWrapper>
      <p className='message'>{t('processingPayment')}</p>
      <p className='message-info'>
        Si en unos segundos no aparece la página  del banco para realizar el pago,
        pulse en el siguiente <a href={`${url}`}>enlace</a>.
      </p>
    </PaymentCheckoutWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCheckout);