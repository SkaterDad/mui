var babelHelpers = require('./babel-helpers.js');
/**
 * MUI React Textarea Component
 * @module react/textarea
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
 * Textarea constructor
 * @class
 */

var Textarea = function (_React$Component) {
  babelHelpers.inherits(Textarea, _React$Component);

  function Textarea(props) {
    babelHelpers.classCallCheck(this, Textarea);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, props));

    _this.state = {
      value: null
    };

    _this.state.value = _this.props.value;
    return _this;
  }

  babelHelpers.createClass(Textarea, [{
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
  return Textarea;
}(_react2.default.Component);

Textarea.propTypes = {
  rows: PropTypes.number
};
Textarea.defaultProps = {
  type: 'textarea',
  rows: 2
};
exports.default = Textarea;
module.exports = exports['default'];