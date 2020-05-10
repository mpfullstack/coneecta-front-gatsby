import React from 'react'
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'react-bootstrap';
import theme from '../theme';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';

const DatePickerWrapper = styled.div`
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
  if (date && time && !fetchingAvailableDates && !fetchingAvailableTimes) {
    return <Button variant="primary">Confirmar</Button>;
  } else {
    return null;
  }
}

const DateTimePicker = ({ booking, onSelectDate, onSelectTime }) => {
  // TODO: Setup dates and times available properly
  return (
    <>
      {booking.fetchingAvailableDates ?
        <Skeleton height={140} />
        :
        <DatePickerWrapper>
          <DatePicker
            getSelectedDay={value => onSelectDate(String(value))}
            fromDate={new Date(2020, 5, 15)}
            endDate={90}
            labelFormat={"MMMM yyyy"} />
        </DatePickerWrapper>
      }

      {booking.fetchingAvailableTimes ?
        <Skeleton height={30} count={5} />
        :
        <TimePickerWrapper>
          <TimePicker
            valueGroups={{ time: '13:00' }}
            optionGroups={{ time: availableTimes }}
            onSelectTime={onSelectTime} />
        </TimePickerWrapper>
      }

      <ConfirmButton {...booking} />
    </>
  )
}

export default DateTimePicker;