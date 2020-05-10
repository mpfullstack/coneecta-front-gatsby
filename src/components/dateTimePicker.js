import React from 'react'
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import theme from '../theme';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';

const DateTimePickerWrapper = styled.div`
  .action-buttons {
    position: fixed;
    width: 100%;
    margin-left: -15px;
    bottom: 0;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    .confirm-button {
      text-transform: uppercase;
      width: 100%;
      border-radius: 0;
    }
  }
`;

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
    color: ${theme.dateTimePickerColor};
    font-size: 32px;
  }
`;

const TimePickerWrapper = styled.div`
  .picker-container {
    width: 94%;
    margin: 0 auto;

    .picker-column {
        .picker-item.picker-item-selected {
        color: rgb(55, 78, 140);
        font-weight: bold;
      }
    }

    .picker-highlight:after, .picker-highlight:before {
      background-color: rgb(55, 78, 140);
    }
  }
`;

const availableTimes = [
  { value: '12:00', label: '12:00' },
  { value: '12:30', label: '12:30' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' }
];

const ConfirmButton = ({ date, time, fetchingAvailableDates, fetchingAvailableTimes }) => {
  const { t } = useTranslation();

  let disabled = true;
  if (date && time && !fetchingAvailableDates && !fetchingAvailableTimes) {
    disabled = false;
  }
  return <Button
    className='confirm-button' variant='primary' size='lg' disabled={disabled}>
      {t('Confirm')}
    </Button>;
}

const DateTimePicker = ({ booking, onSelectDate, onSelectTime }) => {
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
        <Skeleton height={42.5} count={3} />
        :
        <TimePickerWrapper>
          <TimePicker
            valueGroups={{}/*{ time: '13:00' }*/}
            optionGroups={{ time: availableTimes }}
            onSelectTime={onSelectTime} />
        </TimePickerWrapper>
      }

      <div className='action-buttons'>
        <ConfirmButton {...booking} />
      </div>
    </DateTimePickerWrapper>
  )
}

export default DateTimePicker;