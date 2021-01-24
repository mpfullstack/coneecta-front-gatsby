import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { performSessionAction } from './profileSlice';
import { clearBooking, hideSessionAlert } from '../booking/bookingSlice';
import DateTimePicker from '../../components/dateTimePicker';
import AlertPopUp from '../../components/alertPopUp';
import FormControl from '../../components/form/formControl';
import RatingReview from './ratingReview';
import PrimaryButton from '../../components/buttons/primaryButton';

const mapDispatchToProps = { performSessionAction, hideSessionAlert, clearBooking };
const mapStateToProps = ({ booking }) => {
  return {
    booking,
    showSessionAlert: booking ? booking.showSessionAlert : false,
    cancelSessionHoursLimit: booking && booking.timelimits ?
      booking.timelimits.cancel_session / 60 / 60 : 24
  }
}

const BookingDetailActionWrapper = styled.div`
  padding-bottom: 50px;
  .date-time-picker-container {
    padding-bottom: 0;
  }
  .detail-text {
    text-align: center;
  }
  .tip-text {
    text-align: center;
    font-style: italic;
    margin: 2px 0;
  }
  .action-button {
    display: flex;
    justify-content: center;
    width: 100%;
    & > div {
      display: flex;
      justify-content: center;
      width: 100%;
      .btn {
        width: 80%;
      }
    }
  }
`;

const BookingDetailAction = ({
  id, action, performSessionAction, booking, clearBooking, hideSessionAlert, showSessionAlert
}) => {
  const [formError, setFormError] = useState({});
  const { t } = useTranslation();
  let ratingReviewValue;

  function buildPayload(actionToPerform) {
    let payload = {
      id: Number(id),
      action: actionToPerform
    };
    if (actionToPerform === 'suggest_modification') {
      payload.data = {
        start: `${format(new Date(booking.date), 'yyyyMMdd')}${booking.time.replace(':','')}`,
        comments: document.getElementById('comments').value
      };
    } else if (actionToPerform === 'review_session') {
      payload.data = {
        rating: Number(ratingReviewValue),
        comments: document.getElementById('comments').value
      }
    } else if (actionToPerform === 'claim_session') {
      if (!document.getElementById('comments').value) {
        setFormError({
          isValid: { isValid: false, isInvalid: true },
          error: t('isRequired')
        });
        payload = null;
      } else {
        payload.data = {
          comments: document.getElementById('comments').value
        }
      }
    }
    return payload;
  }

  function renderAction(action) {
    if (action === 'modify') {
      return (
        <div>
          <p className='detail-text'>{t('When do you want to change your booking for?')}</p>
          <DateTimePicker
            timeZoneDisabled={true}
            onConfirm={() => {
              clearBooking();
              const payload = buildPayload('suggest_modification');
              if (payload) {
                performSessionAction(payload);
              }
            }}
            onConfirmButtonText={t('Confirm')} />
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' />
        </div>
      );
    } else if (action === 'review') {
      return (
        <div>
          <p className='detail-text'><strong>{t('How was your booking?')}</strong></p>
          <p className='detail-text'>{t('Leave your review')}</p>
          <p className='tip-text'>{t('reivewTipMessage')}</p>
          <RatingReview onChange={value => ratingReviewValue = value } />
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' />
          <div className='action-button'>
            <PrimaryButton onClick={() => performSessionAction(buildPayload('review_session'))}>
              {t('Send review')}
            </PrimaryButton>
          </div>
        </div>
      );
    } else if (action === 'claim') {
      return (
        <div>
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' {...formError}/>
          <div className='action-button'>
            <PrimaryButton onClick={() => performSessionAction(buildPayload('claim_session'))}>
              {t('Send claim')}
            </PrimaryButton>
          </div>
        </div>
      );
    } else if (action === 'success') {
      return (
        <div>
          <p className='detail-text'><strong>Tu solicitud ha sido enviada</strong></p>
          <p className='detail-text'>Estamos a la espera de la confirmación del profesional.</p>
        </div>
      );
    } else if (action === 'review_session_success') {
      return (
        <div>
          <p className='detail-text'><strong>Tu valoración ha sido enviada</strong></p>
          <p className='detail-text'>Muchas gracias</p>
        </div>
      );
    } else if (action === 'claimed') {
      return (
        <div>
          <p className='detail-text'><strong>Tu solicitud ha sido enviada</strong></p>
        </div>
      );
    }
  }

  return (
    <BookingDetailActionWrapper>
      <Row className={`justify-content-md-center`}>
        <Col xs='12' md='10'>
          {renderAction(action)}
        </Col>
      </Row>
      <AlertPopUp
        className='cancel-session-alert'
        show={showSessionAlert}
        body={booking.sessionAlertMessage}
        onCancel={hideSessionAlert}
        onAccept={() => {
          hideSessionAlert();
          if (booking.keepGoingAfterShowingAlert) {
            performSessionAction(buildPayload('suggest_modification'))
          }
        }} />
    </BookingDetailActionWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailAction);