import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import ProfileLayout from '../../components/profileLayout';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
import { updateCredits, checkout } from '../payment/paymentSlice';
import { clearBooking } from '../booking/bookingSlice';
import BuyCredits from '../payment/buyCredits';
import PaymentButton from '../payment/paymentButton';
import { CurrentWalletAmount } from './wallet';

const mapDispatchToProps = { clearBooking, updateCredits, checkout };
const mapStateToProps = ({ profile, payment }) => {
  return {
    paymentStatus: payment.status,
    credits: payment.credits,
    availableCredits: profile.details ? profile.details.credits : '',
  };
}

const RechargeWalletWrapper = styled.div`
  padding-bottom: 60px;
  .title {
    margin-bottom: 20px;
  }
`;

const RechargeWallet = ({ clearBooking, credits, paymentStatus, updateCredits, checkout, availableCredits }) => {
  const { t } = useTranslation();

  useEffect(() => {
    clearBooking();
  }, [clearBooking]);

  return (
    <ProfileLayout>
      <RechargeWalletWrapper>
        <SEO title={t('rechargeWallet')} />
        <h1 className='title'>{t('rechargeWallet')}</h1>
        <Row>
          <Col xs='12' md='10'>
            <CurrentWalletAmount amount={availableCredits} />
          </Col>
        </Row>
        <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
          <Col xs='12' md='10'>
            <BuyCredits credits={credits} onChange={value => updateCredits(value)} />
            <PaymentButton status={paymentStatus} value={t('buy')} onClick={() => {
                updateCredits(credits);
                checkout(credits);
              }} />
          </Col>
        </Row>
      </RechargeWalletWrapper>
    </ProfileLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeWallet);