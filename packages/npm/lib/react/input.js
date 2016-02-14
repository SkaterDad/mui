var babelHelpers = require('./babel-helpers.js');
/**                                                                            
 * MUI React Input Component
 * @module react/input
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _textField = require('./text-field');

var PropTypes = _react2.default.PropTypes;

/**
 * Input constructor
 * @class
 */

var Input = function (_React$Component) {
  babelHelpers.inherits(Input, _React$Component);

  function Input(props) {
    babelHelpers.classCallCheck(this, Input);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

    _this.state = {
      value: null
    };

    _this.state.value = _this.props.value;
    return _this;
  }

  babelHelpers.createClass(Input, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // update value from props to support .setState() on instance
      var value = nextProps.value;
      if (value !== null) this.setState({ value: value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_textField.TextField, babelHelpers.extends({}, this.props, { value: this.state.value }));
    }
  }]);
  return Input;
}(_react2.default.Component);

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'password'])
};
Input.defaultProps = {
  type: 'text'
};
exports.default = Input;
module.exports = exports['default'];