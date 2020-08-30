import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import { hideCancelSessionAlert } from '../booking/bookingSlice';
import DateTimePicker from '../../components/dateTimePicker';
import AlertPopUp from '../../components/alertPopUp';
import FormControl from '../../components/form/formControl';

const mapDispatchToProps = { loadSessionDetail, performSessionAction, hideCancelSessionAlert };
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
`;

const BookingDetailAction = ({
  id, action, loadSessionDetail, performSessionAction, booking,
  cancelSessionHoursLimit, hideCancelSessionAlert, showCancelSessionAlert
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  function buildPayload(actionToPerform) {
    if (actionToPerform === 'suggest_modification') {
      return {
        id,
        action: actionToPerform,
        data: {
          start: `${format(new Date(booking.date), 'yyyyMMdd')}${booking.time.replace(':','')}`,
          comments: document.getElementById('comments').value
        }
      };
    }
  }

  function renderAction(action) {
    if (action === 'modify') {
      return (
        <div>
          <p>{t('When do you want to change your booking for?')}</p>
          <DateTimePicker
            onConfirm={() => performSessionAction(buildPayload('suggest_modification'))}
            onConfirmButtonText={t('Confirm')} />
          <FormControl label={t('leaveSomeComments')} name={'comments'} as='textarea' />
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
        onAccept={() => performSessionAction(buildPayload('suggest_modification'))} />
    </BookingDetailActionWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailAction);