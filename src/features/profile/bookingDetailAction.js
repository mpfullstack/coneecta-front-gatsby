import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { loadSessionDetail, performSessionAction } from './profileSlice';
import { hideCancelSessionAlert } from '../booking/bookingSlice';
import DateTimePicker from '../../components/dateTimePicker';
import AlertPopUp from '../../components/alertPopUp';

const mapDispatchToProps = { loadSessionDetail, performSessionAction, hideCancelSessionAlert };
const mapStateToProps = ({ booking }) => {
  return {
    showCancelSessionAlert: booking ? booking.showCancelSessionAlert : false,
    cancelSessionHoursLimit: booking && booking.timelimits ?
      booking.timelimits.cancel_session / 60 / 60 : 24
  }
}

const BookingDetailActionWrapper = styled.div`
`;

const BookingDetailAction = ({
  id, action, loadSessionDetail, performSessionAction,
  cancelSessionHoursLimit, hideCancelSessionAlert, showCancelSessionAlert
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    loadSessionDetail(id);
  }, [loadSessionDetail, id]);

  function renderAction(action) {
    if (action === 'modify') {
      return (
        <div>
          <p>{t('When do you want to change your booking for?')}</p>
          <DateTimePicker onConfirm={() => {
            // TODO: Move to a function and use it below in AlertPopUp
            const payload = {
              id,
              action: 'suggest_modification',
              data: {
                start: '',
                comments: ''
              }
            };
            performSessionAction(payload);
          }} onConfirmButtonText={t('Confirm')} />
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
          // TODO: Build payload properly session id, start and comments
          const payload = {
            id,
            action: 'suggest_modification',
            data: {
              start: '',
              comments: ''
            }
          };
          performSessionAction(payload);
        }} />
    </BookingDetailActionWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailAction);