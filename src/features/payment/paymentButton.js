import React from 'react';
import { useTranslation } from 'react-i18next';
import ActionButtons from '../../components/buttons/actionButtons';
import PrimaryButton from '../../components/buttons/primaryButton';

const PaymentButton = ({ status, value, onClick }) => {
  const { t } = useTranslation();

  return (
    <ActionButtons>
      <PrimaryButton className='confirm-button' variant='primary' size='lg'
        onClick={onClick}>
        {status === 'processing' ? t('processingPayment') : value || t('pay')}
      </PrimaryButton>
    </ActionButtons>
  );
}

export default PaymentButton;
