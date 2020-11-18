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
import { clearBooking } from '../booking/bookingSlice';

const mapDispatchToProps = { clearBooking };
const mapStateToProps = ({ profile }) => {
  return {};
}

const RechargeWalletWrapper = styled.div``;

const RechargeWallet = ({ clearBooking }) => {
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
        <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
          <Col xs='12' md='10'>

          </Col>
        </Row>
      </RechargeWalletWrapper>
    </ProfileLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeWallet);