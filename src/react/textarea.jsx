/**
 * MUI React Textarea Component
 * @module react/textarea
 */

'use strict';

import React from 'react';

import { TextField } from './text-field';


const PropTypes = React.PropTypes;


/**
 * Textarea constructor
 * @class
 */
class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state.value = this.props.value;
  }

  state= {
    value: null
  }

  static propTypes = {
    rows: PropTypes.number
  };

  static defaultProps = {
    type: 'textarea',
    rows: 2
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


export default Textarea;
