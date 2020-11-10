import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { performSessionAction } from './profileSlice';
import { hideCancelSessionAlert } from '../booking/bookingSlice';
import DateTimePicker from '../../components/dateTimePicker';
import AlertPopUp from '../../components/alertPopUp';
import FormControl from '../../components/form/formControl';
import RatingReview from './ratingReview';
import PrimaryButton from '../../components/buttons/primaryButton';

const mapDispatchToProps = { performSessionAction, hideCancelSessionAlert };
const mapStateToProps = ({ booking }) => {
  return {
    booking,
    showCancelSessionAlert: booking ? booking.showCancelSessionAlert : false,
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
  .action-button {
    display: flex;
    justify-content: center;
  }
`;

const BookingDetailAction = ({
  id, action, performSessionAction, booking,
  cancelSessionHoursLimit, hideCancelSessionAlert, showCancelSessionAlert
}) => {
  const { t } = useTranslation();
  let ratingReviewValue;

  function buildPayload(actionToPerform) {
    const payload = {
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
      payload.data = {
        comments: document.getElementById('comments').value
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
            onConfirm={() => performSessionAction(buildPayload('suggest_modification'))}
            onConfirmButtonText={t('Confirm')} />
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' />
        </div>
      );
    } else if (action === 'review') {
      return (
        <div>
          <p className='detail-text'><strong>{t('How was your booking?')}</strong></p>
          <p className='detail-text'>{t('Leave your review')}</p>
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
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' />
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
        show={showCancelSessionAlert}
        body={t('cancelSessionAlert', { hours: cancelSessionHoursLimit })}
        onCancel={hideCancelSessionAlert}
        onAccept={() => {
          hideCancelSessionAlert();
          performSessionAction(buildPayload('suggest_modification'))
        }} />
    </BookingDetailActionWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailAction);