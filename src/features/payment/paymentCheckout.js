import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import styled from 'styled-components';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';

const mapDispatchToProps = {};
const mapStateToProps = ({ payment }) => {
  return {
    url: payment.checkoutDetails.url,
    fields: payment.checkoutDetails.fields
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

const PaymentCheckout = ({ url, fields }) => {
  const { t } = useTranslation();

  // Submit the form to post the checkout details to tpv url
  useEffect(() => {
    setTimeout(() => document.getElementById('submit-button').click(), 250);
    // NOTE: For testing purpose
    // window.location.href = '/profile/payment_ok/30';
  }, []);

  return (
    <PaymentCheckoutWrapper>
      <p className='message'>{t('processingPayment')}</p>
      <p className='message-info'>Si en unos segundos no aparece la página  del banco para realizar el pago, pulse el boton "ENVIAR"</p>
      <form id='checkout-form' className='form' action={url} method='post'>
        {parse(fields)}
        <input id='submit-button' type='submit' name='submit' value='Enviar' className='submit' />
      </form>
    </PaymentCheckoutWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCheckout);