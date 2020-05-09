import React, { Component } from 'react'
import DatePicker from './datePicker/DatePicker';
import styled from 'styled-components';

const Wrapper = styled.div`
  .svg-inline--fa {
    color: #374e8c !important;
    font-size: 32px;
  }
`;

const DateTimePicker = ({ booking }) => {
  return (
    <Wrapper>
      <DatePicker
        getSelectedDay={value => console.log('select day', value)}
        endDate={350}
        labelFormat={"MMMM yyyy"}
        color={"#374e8c"}/>
    </Wrapper>
  )
}

export default DateTimePicker;