import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import ProfileLayout from '../../components/profileLayout';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
// import Skeleton from '../../components/skeleton';
// import Pagination from '../../components/pagination';
// import useContentLoaded from '../../components/hooks/useContentLoaded';
import { clearBooking } from '../booking/bookingSlice';
import { Link } from 'gatsby';
import PrimaryButton from '../../components/buttons/primaryButton';

const mapDispatchToProps = { clearBooking };
const mapStateToProps = ({ profile }) => {
  return {
    profile
  };
}

const WalletWrapper = styled.div`
  .title {
    margin-bottom: 20px;
  }
  .current-amount-text {
    text-align: center;
    font-size: 16px;
    .amount {
      font-weight: 800;
      font-size: 24px;
      margin-left: 5px;
    }
  }
  .buy-credits {
    display: flex;
    justify-content: center;
  }
`;

const Wallet = ({ profile, clearBooking }) => {
  const { t } = useTranslation();

  // useEffect(() => {
  //   clearBooking();
  // }, [clearBooking]);

  // const loaded = useContentLoaded(loading);

  return (
    <ProfileLayout>
      <WalletWrapper>
        <SEO title="Monedero" />
        <h1 className='title'>Monedero</h1>
        <Row>
          <Col xs='12' md='10'>
            <p className='current-amount-text'>Saldo disponible en tu cuenta <span className='amount'>350€</span></p>
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='10' className='buy-credits'>
            <Link to='/profile/wallet/recharge'><PrimaryButton>Comprar créditos</PrimaryButton></Link>
          </Col>
        </Row>
      </WalletWrapper>
    </ProfileLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);