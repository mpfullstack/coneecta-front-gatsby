import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';
import { pay } from './paymentSlice';

const mapDispatchToProps = { pay };
const mapStateToProps = ({ profile, payment }) => {
  return {
    profile,
    payment
  }
}

const PaymentButton = ({ pay, payment }) => {
  const { t } = useTranslation();

  return (
    <ActionButtons>
      <PrimaryButton className='confirm-button' variant='primary' size='lg'
        onClick={() => pay()}>
        {payment.status === 'processing' ? t('processingPayment') : t('pay')}
      </PrimaryButton>
    </ActionButtons>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentButton);
