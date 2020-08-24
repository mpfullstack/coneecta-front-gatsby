import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import Skeleton from '../../components/skeleton';
import BookingItem from './bookingItem';
import PrimaryButton from '../../components/buttons/primaryButton';

const mapDispatchToProps = { loadSessionDetail, performSessionAction };
const mapStateToProps = ({ profile }) => {
  return {
    sessionDetail: profile.sessionDetail,
    loading: profile.loadingSessions
  }
}

const BookingActionsWrapper = styled.div`
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const BookingActions = ({ actions, id, performAction }) => {
  const { t } = useTranslation();

  return (
    <BookingActionsWrapper>
      {actions ?
        actions.map(action => {
          return (
            <PrimaryButton onClick={() => performAction({ action, id })}>
              {t(action)}
            </PrimaryButton>
          )
        })
        :
        <Skeleton height={100} />
      }
    </BookingActionsWrapper>
  );
}

const BookingDetailWrapper = styled.div`
  .advices {
    .advice-item {
      text-align: center;
    }
  }
`;

const BookingDetail = ({ id, sessionDetail, loading, loadSessionDetail, performSessionAction }) => {
  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  const session = sessionDetail ? sessionDetail.info : null;
  const advices = sessionDetail ? sessionDetail.advices : null;
  const actions = sessionDetail ? sessionDetail.actions : null;

  return (
    <BookingDetailWrapper>
      <SEO title="Datos de la reserva" />
      <h1 className='title'>Datos de la reserva</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          <BookingItem session={session} linkable={false} />
        </Col>
      </Row>
      <Row className={`justify-content-md-center`}>
        <Col xs='12' md='10'>
          <div className='advices'>
            {advices ?
              advices.map((advice, i) => <p className='advice-item' key={`advice_${i}`}>{advice}</p>)
              :
              loading ? <Skeleton height={100} /> : null
            }
          </div>
        </Col>
      </Row>
      <Row className={`justify-content-md-center`}>
        <Col xs='12' md='10'>
          <BookingActions id={id} actions={actions} performAction={payload => performSessionAction(payload)} />
        </Col>
      </Row>
    </BookingDetailWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);