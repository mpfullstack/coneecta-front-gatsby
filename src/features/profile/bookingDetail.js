import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { Row, Col } from 'react-bootstrap';
import SEO from "../../components/seo";
import { useTranslation } from 'react-i18next';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import { initAvailableDates, setBookingId } from '../booking/bookingSlice';
import Skeleton from '../../components/skeleton';
import BookingItem from './bookingItem';
import PrimaryButton from '../../components/buttons/primaryButton';
import BookingDetailAction from './bookingDetailAction';
import FormControl from '../../components/form/formControl';
import useContentLoaded from '../../components/hooks/useContentLoaded';
import { generateAvailableDates } from '../../helpers/data';

const mapDispatchToProps = { loadSessionDetail, performSessionAction, setBookingId, initAvailableDates };
const mapStateToProps = ({ profile }) => {
  return {
    sessionDetail: profile.sessionDetail,
    loading: profile.loadingSessions
  }
}

const BookingActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    .btn {
      width: 80%;
    }
  }
`;

const BookingActions = ({ actions, id, performAction, initAvailableDates, setBookingId, date }) => {
  const { t } = useTranslation();

  return (
    <BookingActionsWrapper>
      {actions ?
        actions.map(action => {
          return (
            <PrimaryButton key={`action_${action}_${id}`} onClick={() => {
              if (action === 'suggest_modification') {
                setBookingId(id);
                initAvailableDates(generateAvailableDates(date));
                navigate(`/profile/bookings/${id}/modify`);
              } else if (action === 'claim_session') {
                navigate(`/profile/bookings/${id}/claim`);
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
  .sub-title {
    font-weight: 800;
    margin: 30px 0 0;
    font-size: 18px;
    text-align: center;
  }
  .action-button {
    margin-bottom: 20px;
    & > div {
      display: flex;
      justify-content: center;
      .btn {
        width: 80%;
      }
    }
  }
`;

const BookingDetail = ({ id, action, sessionDetail, loading, loadSessionDetail, performSessionAction, initAvailableDates, setBookingId }) => {
  const [formError, setFormError] = useState({});

  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  const { t } = useTranslation();

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
              <BookingActions id={id} actions={loaded ? actions : null}
                date={loaded ? new Date(session.date) : null}
                initAvailableDates={initAvailableDates}
                setBookingId={setBookingId}
                performAction={payload => performSessionAction(payload)} />
            </Col>
            <Col xs='12' md='10'>
              <h2 className='sub-title'>Chat</h2>
              <FormControl label={t('writeYourMessage')} name={'message'} as='textarea' {...formError} />
              <div className='action-button'>
                <PrimaryButton onClick={() => {
                  const message = document.getElementById('message').value;
                  if (!message) {
                    setFormError({
                      isValid: { isValid: false, isInvalid: true },
                      error: t('isRequired')
                    });
                  } else {
                    setFormError({
                      isValid: { isValid: true, isInvalid: false },
                      error: null
                    });
                    performSessionAction({ action: 'message', data: { session: Number(id), message } });
                  }
                }}>
                  {t('sendMessage')}
                </PrimaryButton>
              </div>
            </Col>
          </Row>
        }
    </BookingDetailWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);