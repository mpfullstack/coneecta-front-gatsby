import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import ProfileLayout from '../../components/profileLayout';
import SEO from "../../components/seo";
// import { useTranslation } from 'react-i18next';
// import Skeleton from '../../components/skeleton';
// import Pagination from '../../components/pagination';
// import useContentLoaded from '../../components/hooks/useContentLoaded';
import { updateCredits, checkout } from '../payment/paymentSlice';
import { clearBooking } from '../booking/bookingSlice';
import BuyCredits from '../payment/buyCredits';
import PaymentButton from '../payment/paymentButton';
import { CurrentWalletAmount } from './wallet';

const mapDispatchToProps = { clearBooking, updateCredits, checkout };
const mapStateToProps = ({ payment }) => {
  return {
    paymentStatus: payment.status,
    credits: payment.credits
  };
}

const RechargeWalletWrapper = styled.div`
  .title {
    margin-bottom: 20px;
  }
`;

const RechargeWallet = ({ clearBooking, credits, paymentStatus, checkout }) => {
  // const { t } = useTranslation();

  useEffect(() => {
    clearBooking();
  }, [clearBooking]);

  // const loaded = useContentLoaded(loading);

  return (
    <ProfileLayout>
      <RechargeWalletWrapper>
        <SEO title="Recargar monedero" />
        <h1 className='title'>Recargar monedero</h1>
        <Row>
          <Col xs='12' md='10'>
            <CurrentWalletAmount amount={350} />
          </Col>
        </Row>
        <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
          <Col xs='12' md='10'>
            <BuyCredits credits={credits} onChange={e => updateCredits(e.target.value)} />
            <PaymentButton status={paymentStatus} value={'Comprar'} onClick={() => {
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