import React, { useEffect } from 'react'
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
  splitTimeZoneName
} from '../helpers/data';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';
import TimeZonePicker from './timePicker/timeZonePicker';
import ActionButtons from '../components/buttons/actionButtons';
import PrimaryButton from '../components/buttons/primaryButton';

const DateTimePickerWrapper = styled.div`
  .timezone-container {
    padding-right: 0;
    margin-bottom: 6px;
  }
`;

const DatePickerWrapper = styled.div`
  border: 1px solid ${theme.dateTimePickerBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.dateTimePickerBackgroundColor};
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
      opacity: .3;
    }
  }

  .svg-inline--fa {
    color: ${theme.dateTimePickerButtonsColor};
    font-size: 32px;
  }
`;

const ConfirmButton = ({ date, time, fetchingAvailableDates, fetchingAvailableTimes, id }) => {
  const { t } = useTranslation();

  let disabled = true;
  if (date && time && !fetchingAvailableDates && !fetchingAvailableTimes) {
    disabled = false;
  }
  return <PrimaryButton onClick={() => navigate(`/login${id ? `/?id=${id}` : ''}`)}
    className='confirm-button' variant='primary' size='lg' disabled={disabled}>
      {t('Book')}
  </PrimaryButton>;
}

const DateTimePicker = ({ profile, booking, onSelectDate, onSelectTime, fetchAvailableTimeZones, onSelectTimeZone }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const jstz = require('jstimezonedetect');
    const timezone = jstz.determine().name();
    if (timezone) {
      onSelectTimeZone(timezone);
    }
    fetchAvailableTimeZones();
  }, [fetchAvailableTimeZones, onSelectTimeZone]);

  return (
    <DateTimePickerWrapper>
      <Row>
        <Col>
          {booking.fetchingAvailableDates ?
            <Skeleton height={117} />
            :
            <DatePickerWrapper>
              <DatePicker
                getSelectedDay={value => onSelectDate(String(value))}
                fromDate={getFromDate(booking.availableDates)}
                endDate={getAmountOfDaysToEnd(booking.availableDates)}
                isDateAvailable={date => isDateAvailable(date, booking.availableDates)}
                labelFormat={'MMMM yyyy'} />
            </DatePickerWrapper>
          }
        </Col>
      </Row>
      <Row>
        <Col xs='6' className='timezone-container'>
          {booking.fetchingTimeZones ?
            <Skeleton height={121} count={1} />
            :
            <TimeZonePicker
              timezones={adaptTimeZonesToArray(booking.timezones)}
              selected={booking.timezone}
              onSelectTimeZone={onSelectTimeZone}
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
              onSelectTime={onSelectTime} />
          }
        </Col>
      </Row>
      <ActionButtons>
        <ConfirmButton {...booking} id={profile.id} />
      </ActionButtons>
    </DateTimePickerWrapper>
  )
}

export default DateTimePicker;