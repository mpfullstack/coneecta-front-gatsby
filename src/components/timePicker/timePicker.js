import React, { Component } from 'react';
import styled from 'styled-components';
import Picker from './picker';
import theme from '../../theme';

const TimePickerWrapper = styled.div`
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
      .picker-item {
        text-align: center;
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
        &.picker-item-not-available {
          opacity: .3;
          /*&:after {
            content: 'ND';
            position: absolute;
          }*/
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
    const { optionGroups, valueGroups, height = 120 } = this.props;

    return (
      <TimePickerWrapper>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
          height={height} />
      </TimePickerWrapper>
    );
  }
}

export default TimePicker;