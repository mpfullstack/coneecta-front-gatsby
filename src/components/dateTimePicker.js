import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Skeleton from '../components/skeleton';
import theme from '../theme';
import {
  getFromDate,
  getAmountOfDaysToEnd,
  isDateAvailable,
  adaptTimeZonesToArray,
  getAvailableTimes,
  splitTimeZoneName,
  isWithinCancellationLimits,
  isPastTime
} from '../helpers/data';
import {
  selectDate, selectTime, showSessionAlert,
  fetchAvailableTimeZones, selectTimeZone
} from '../features/booking/bookingSlice';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';
import TimeZonePicker from './timePicker/timeZonePicker';
import ActionButtons from '../components/buttons/actionButtons';
import PrimaryButton from '../components/buttons/primaryButton';
import BookingReview from './bookingReview';

const mapDispatchToProps = {
  selectDate,
  selectTime,
  selectTimeZone,
  fetchAvailableTimeZones,
  showSessionAlert
};
const mapStateToProps = ({ booking }) => {
  return {
    booking,
    cancelSessionHoursLimit: booking && booking.timelimits ?
      booking.timelimits.cancel_session / 60 / 60 : 24
  }
}

const DateTimePickerWrapper = styled.div`
  padding-bottom: 40px;
  .timezone-row-wrapper {
    min-height: 133px;
    .timezone-container {
      padding-right: 0;
      margin-bottom: 6px;
    }
  }
`;

const DatePickerWrapper = styled.div`
  border: 1px solid ${theme.boxBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.boxBackgroundColor};
  margin-bottom: 6px;

  #container {
    padding-bottom: 20px;
  }

  .monthYearLabel {
    color: ${theme.dateTimePickerColor};
  }

  .dateDayItem {
    &.selected {
      background-color: ${theme.dateTimePickerColor};
      border: 2px solid ${theme.dateTimePickerColor};
      color: ${theme.dateTimePickerSelectedTextColor};
    }
    &.not-available {
      opacity: .4;
    }
  }

  .svg-inline--fa {
    color: ${theme.dateTimePickerButtonsColor};
    font-size: 32px;
  }
`;

const DateTimePicker = ({
  booking, selectDate, selectTime, fetchAvailableTimeZones,
  showSessionAlert, selectTimeZone, slug, onConfirm,
  onConfirmButtonText = '', timeZoneDisabled = false, cancelSessionHoursLimit
}) => {
  const { t } = useTranslation();

  function confirmBooking({ timelimits, timezone, date, time }) {
    if (isPastTime(new Date(date), time, timezone)) {
      showSessionAlert({
        message: t('pastTimeSessionAlert'),
        keepGoing: false
      });
    } else if (isWithinCancellationLimits(new Date(date), time, timezone, timelimits.cancel_session)) {
      // Show cancellation alert before continue
      showSessionAlert({
        message: t('cancelSessionAlert', { hours: cancelSessionHoursLimit }),
        keepGoing: true
      });
    } else { // Continue as normal
      if (typeof onConfirm === 'function' ) {
        onConfirm();
      } else {
        navigate(`/profile/payment${slug ? `?slug=${slug}` : ''}`);
      }
    }
  }

  const ConfirmButton = ({ date, time, timezone, timelimits, text }) => {
    let disabled = true;
    if (date && time && !booking.fetchingAvailableDates) {
      disabled = false;
    }
    return <PrimaryButton
      onClick={() => confirmBooking({ date, time, timezone, timelimits })}
      className='confirm-button' variant='primary' size='lg' disabled={disabled}>
        {text || t('Book')}
    </PrimaryButton>;
  }

  useEffect(() => {
    const jstz = require('jstimezonedetect');
    const currentTimeZone = jstz.determine().name();
    if (!booking.timezone && currentTimeZone) {
      selectTimeZone(currentTimeZone);
    } else if (booking.timezone) {
      selectTimeZone(booking.timezone);
    }
    fetchAvailableTimeZones();
  }, [fetchAvailableTimeZones, selectTimeZone, booking.timezone]);

  return (
    <DateTimePickerWrapper className='date-time-picker-container'>
      <Row>
        <Col>
          {booking.fetchingAvailableDates ?
            <Skeleton height={117} />
            :
            <DatePickerWrapper>
              <DatePicker
                getSelectedDay={value => selectDate(String(value))}
                fromDate={getFromDate(booking.availableDates)}
                endDate={getAmountOfDaysToEnd(booking.availableDates)}
                isDateAvailable={date => isDateAvailable(date, booking.availableDates)}
                labelFormat={'MMMM yyyy'} />
            </DatePickerWrapper>
          }
        </Col>
      </Row>
      <Row className='timezone-row-wrapper'>
        <Col xs='6' className='timezone-container'>
          {booking.fetchingTimeZones ?
            <Skeleton height={121} count={1} />
            :
            <TimeZonePicker
              disabled={timeZoneDisabled}
              timezones={adaptTimeZonesToArray(booking.timezones, { value: null, label: t('Select the timezone') })}
              selected={booking.timezone}
              onSelectTimeZone={selectTimeZone}
              {...splitTimeZoneName(booking.timezones, booking.timezone)}/>
          }
          {/* TODO: Add edit icon */}
        </Col>
        <Col xs='6'>
          {booking.fetchingAvailableDates ?
            <Skeleton height={121} count={1} />
            :
            <TimePicker
              valueGroups={{time: booking.time || '' }}
              optionGroups={{ time: getAvailableTimes(booking.availableDates, booking.date, { value: null, label: t('Select the time') }) }}
              onSelectTime={selectTime}
              showAvailabilityIcon={true}
              isTimeAvailable={booking.isTimeAvailable} />
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <BookingReview booking={booking} />
        </Col>
      </Row>
      <ActionButtons>
        <ConfirmButton {...booking} text={onConfirmButtonText} />
      </ActionButtons>
    </DateTimePickerWrapper>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);