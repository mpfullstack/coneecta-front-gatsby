import React from 'react'
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Skeleton from '../components/skeleton';
import theme from '../theme';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';
import ActionButtons from '../components/buttons/actionButtons';

const DateTimePickerWrapper = styled.div``;

const DatePickerWrapper = styled.div`
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
  }

  .svg-inline--fa {
    color: ${theme.dateTimePickerButtonsColor};
    font-size: 32px;
  }
`;

const TimePickerWrapper = styled.div`
  .picker-container {
    width: 94%;
    margin: 0 auto;

    .picker-column {
      .picker-item {
        &:first-child {
          font-size: 16px;

        }
        &.picker-item-selected {
          color: ${theme.dateTimePickerColor};
          font-weight: bold;
        }
        &.picker-item-selected:first-child {
          font-weight: normal;
        }
      }
    }

    .picker-highlight:after, .picker-highlight:before {
      background-color: ${theme.dateTimePickerColor};
    }
  }
`;

const ConfirmButton = ({ date, time, fetchingAvailableDates, fetchingAvailableTimes, id }) => {
  const { t } = useTranslation();

  let disabled = true;
  if (date && time && !fetchingAvailableDates && !fetchingAvailableTimes) {
    disabled = false;
  }
  return <Button onClick={() => navigate(`/login${id ? `/?id=${id}` : ''}`)}
    className='confirm-button' variant='primary' size='lg' disabled={disabled}>
      {t('Book')}
    </Button>;
}

const DateTimePicker = ({ profile, booking, onSelectDate, onSelectTime }) => {
  const { t } = useTranslation();

  const availableTimes = [
    { value: null, label: t('Select the time') },
    { value: '12:00', label: '12:00' },
    { value: '12:30', label: '12:30' },
    { value: '13:00', label: '13:00' },
    { value: '13:30', label: '13:30' },
    { value: '14:00', label: '14:00' },
    { value: '14:30', label: '14:30' },
    { value: '15:00', label: '15:00' }
  ];

  // TODO: Setup dates and times available properly
  return (
    <DateTimePickerWrapper>
      {booking.fetchingAvailableDates ?
        <Skeleton height={110} />
        :
        <DatePickerWrapper>
          <DatePicker
            getSelectedDay={value => onSelectDate(String(value))}
            fromDate={new Date(2020, 5, 15)}
            endDate={90}
            labelFormat={'MMMM yyyy'} />
        </DatePickerWrapper>
      }

      {booking.fetchingAvailableTimes ?
        <Skeleton height={95} count={1} />
        :
        <TimePickerWrapper>
          <TimePicker
            valueGroups={{time: availableTimes.length ? availableTimes[0].value : '' }}
            optionGroups={{ time: availableTimes }}
            onSelectTime={onSelectTime} />
        </TimePickerWrapper>
      }

      <ActionButtons>
        <ConfirmButton {...booking} id={profile.id} />
      </ActionButtons>
    </DateTimePickerWrapper>
  )
}

export default DateTimePicker;