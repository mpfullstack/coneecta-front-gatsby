import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import ProfileLayout from '../../components/profileLayout';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
import Skeleton from '../../components/skeleton';
import Pagination from '../../components/pagination';
import useContentLoaded from '../../components/hooks/useContentLoaded';
import { Link } from 'gatsby';
import PrimaryButton from '../../components/buttons/primaryButton';
import WalletMovement from '../../components/walletMovement';
import { loadWalletMovements } from './profileSlice';

const mapDispatchToProps = { loadWalletMovements };
const mapStateToProps = ({ profile }) => {
  return {
    credits: profile.details ? profile.details.credits : '',
    movements: profile.walletMovements,
    loading: profile.loadingWalletMovements
  };
}

const CurrentWalletAmountWrapper = styled.p`
  text-align: center;
  font-size: 16px;
  .amount {
    font-weight: 800;
    font-size: 24px;
    margin-left: 5px;
  }
`;

export const CurrentWalletAmount = ({ amount }) => {
  return (
    <CurrentWalletAmountWrapper>
      Saldo disponible <span className='amount'>{`${amount} créditos`}</span>
    </CurrentWalletAmountWrapper>
  );
}

const WalletWrapper = styled.div`
  .title {
    margin-bottom: 20px;
  }
  .sub-title {
    font-weight: 800;
    margin: 30px 0 20px;
    font-size: 18px;
    text-align: center;
  }
  .buy-credits {
    display: flex;
    justify-content: center;
  }
  .no-bookings {
    text-align: center;
  }
`;

const Wallet = ({ movements, loading, loadWalletMovements, credits }) => {
  const { t } = useTranslation();

  useEffect(() => {
    loadWalletMovements();
  }, [loadWalletMovements]);

  const movementsPagination = movements ? movements.pagination : null;
  const profileMovements = movements ? movements.items : null;

  const loaded = useContentLoaded(loading);

  return (
    <ProfileLayout>
      <WalletWrapper>
        <SEO title="Monedero" />
        <h1 className='title'>Monedero</h1>
        <Row>
          <Col xs='12' md='10'>
            <CurrentWalletAmount amount={`${credits}`} />
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='10' className='buy-credits'>
            <Link to='/profile/wallet/recharge'><PrimaryButton>Comprar créditos</PrimaryButton></Link>
          </Col>
        </Row>
        <h2 className='sub-title'>Movimientos</h2>
        <Row>
          <Col xs='12' md='10' className='movements'>
            {loaded && profileMovements ?
              profileMovements.length ?
                profileMovements.map(movement => <WalletMovement movement={movement} />)
                :
                <p className='no-bookings'>{t('youHaveNoMovements')}</p>
              :
              Array.from({length: 2}).map((u, i) => <WalletMovement key={`movement-${i}`} />)
            }
          </Col>
        </Row>
        <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
          <Col xs='12' md='10'>
            {movementsPagination && loaded && movementsPagination.total_pages > 0 ?
              <Pagination
                pages={movementsPagination.total_pages}
                currentPage={movementsPagination.current_page}
                onPaginationClick={page => loadWalletMovements({ page })} /> :
                loading ? <Skeleton height={25} /> : null}
          </Col>
        </Row>
      </WalletWrapper>
    </ProfileLayout>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);