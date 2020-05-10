import React, { Component } from 'react';
import Picker from './picker';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    const { valueGroups, optionGroups } = props;
    this.state = {
      valueGroups,
      optionGroups
    };
  }

  // shouldComponentUpdate(nextProps) {
  //   const { valueGroups } = this.state;
  //   if (!nextProps.valueGroups) {
  //     return true;
  //   } else if (nextProps.valueGroups && nextProps.valueGroups.time === valueGroups.time) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    const { onSelectTime } = this.props;
    onSelectTime(value);
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const {optionGroups, valueGroups } = this.state;

    return (
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange}
        height={120} />
    );
  }
}

export default TimePicker;