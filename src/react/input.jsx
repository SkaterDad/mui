/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

import React from 'react';

import { TextField } from './text-field';


const PropTypes = React.PropTypes;


/**
 * Input constructor
 * @class
 */
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state.value = this.props.value;
  }

  state = {
    value: null
  }

  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'password'])
  };

  static defaultProps = {
    type: 'text'
  };

  componentWillReceiveProps(nextProps) {
    // update value from props to support .setState() on instance
    let value = nextProps.value;
    if (value !== null) this.setState({ value });
  }

  render() {
    return <TextField { ...this.props } value={this.state.value} />;
  }
}


export default Input;
