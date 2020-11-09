import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import Skeleton from '../../components/skeleton';
import BookingItem from './bookingItem';
import PrimaryButton from '../../components/buttons/primaryButton';
import BookingDetailAction from './bookingDetailAction';
import useContentLoaded from '../../components/hooks/useContentLoaded';

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
            <PrimaryButton onClick={() => {
              if (action === 'suggest_modification') {
                navigate(`/profile/bookings/${id}/modify`);
              } else {
                performAction({ action, id });
              }
            }}>
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

const BookingDetail = ({ id, action, sessionDetail, loading, loadSessionDetail, performSessionAction }) => {
  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  const session = sessionDetail ? sessionDetail.info : null;
  const advices = sessionDetail ? sessionDetail.advices : null;
  const actions = sessionDetail ? sessionDetail.actions : null;

  const loaded = useContentLoaded(loading);

  return (
    <BookingDetailWrapper>
      <SEO title="Datos de la reserva" />
      <h1 className='title'>Datos de la reserva</h1>
      <Row className={`justify-content-md-center`} style={{marginTop: '30px'}}>
        <Col xs='12' md='10'>
          <BookingItem session={loaded ? session : null} linkable={false} />
        </Col>
      </Row>
      {action
        ?
          <Row className={`justify-content-md-center`}>
            <Col xs='12' md='10'>
              {loaded ? <BookingDetailAction id={id} action={action} /> : <Skeleton height={250} />}
            </Col>
          </Row>
        :
          <Row className={`justify-content-md-center`}>
            <Col xs='12' md='10'>
              <div className='advices'>
                {loaded ?
                  advices.map((advice, i) => <p className='advice-item' key={`advice_${i}`}>{parse(advice)}</p>)
                  :
                  <Skeleton height={100} />}
              </div>
              <BookingActions id={id} actions={loaded ? actions : null} performAction={payload => performSessionAction(payload)} />
            </Col>
          </Row>
        }
    </BookingDetailWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);