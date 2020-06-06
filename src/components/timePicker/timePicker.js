import React, { Component } from 'react';
import styled from 'styled-components';
import Picker from './picker';
import theme from '../../theme';
import { LowAvailability } from '../icons';

const TimePickerWrapper = styled.div`
  position: relative;
  border: 1px solid ${theme.dateTimePickerBackgroundColor};
  border-radius: 5px;
  background-color: ${theme.dateTimePickerBackgroundColor};
  .picker-container {
    width: 94%;
    margin: 0 auto;

    .picker-inner {
      padding: 0;
      .picker-buttons {
        right: 20%;
      }
    }

    .picker-column {
      .picker-item-wrapper {
        position: relative;
        .picker-item {
          text-align: center;
          &:first-child {
            font-size: 16px;

          }
          &.picker-item-selected {
            color: ${theme.dateTimePickerColor};
            font-weight: bold;
          }
          &.picker-item-not-available {
            opacity: .4;
          }
        }
      }
    }

    .picker-highlight:after, .picker-highlight:before {
      background-color: ${theme.dateTimePickerColor};
    }

    .svg-inline--fa {
      color: ${theme.dateTimePickerButtonsColor};
      font-size: 32px;
    }
  }
  .low-availability {
    position: absolute;
    left: 14px;
    top: 41%;
    .svg-inline--fa {
      font-size: 16px;
    }
  }
`;


class TimePicker extends Component {
  // TODO: Improve by checking if update is needed
  // shouldComponentUpdate(nextProps) {
  //   const { valueGroups } = this.;
  //   if (!nextProps.valueGroups) {
  //     return true;
  //   } else if (nextProps.valueGroups && nextProps.valueGroups.time === valueGroups.time) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // Update the value in response to user picking event
  handleChange = (name, value, available) => {
    const { onSelectTime } = this.props;
    onSelectTime({ value, available });
  };

  render() {
    const { optionGroups, valueGroups, showAvailabilityIcon, isTimeAvailable, height = 120 } = this.props;

    return (
      <TimePickerWrapper>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
          height={height} />

          {showAvailabilityIcon && !isTimeAvailable ?
            <div className='low-availability'>
              <LowAvailability />
            </div> : null}
      </TimePickerWrapper>
    );
  }
}

export default TimePicker;