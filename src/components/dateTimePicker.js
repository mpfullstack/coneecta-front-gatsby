import React from 'react'
import theme from '../theme';
import DatePicker from './datePicker/datePicker';
import TimePicker from './timePicker/timePicker';
import styled from 'styled-components';

const DatePickerWrapper = styled.div`
  .monthYearLabel {
    color: ${theme.dateTimePickerColor};
  }

  .dateDayItem {
    &.selected {
      color: ${theme.dateTimePickerColor};
      border: 2px solid ${theme.dateTimePickerColor};
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

const DateTimePicker = ({ booking, onSelectDate, onSelectTime }) => {

  return (
    <>
      <DatePickerWrapper>
        <DatePicker
          getSelectedDay={value => onSelectDate(String(value))}
          endDate={90}
          labelFormat={"MMMM yyyy"} />
      </DatePickerWrapper>

      <TimePickerWrapper>
        <TimePicker
          valueGroups={{ time: '13:00' }}
          optionGroups={{ time: availableTimes }}
          onSelectTime={onSelectTime} />
      </TimePickerWrapper>
    </>
  )
}

export default DateTimePicker;