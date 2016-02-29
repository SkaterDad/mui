/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    addRippleClass = 'mui-add-ripple', //helper class with no styling
    btnClass = 'mui-btn',
    rippleClass = 'mui-ripple-effect',
    animationName = 'mui-btn-inserted';

/**
 * Determine if element is an input and return props
 * @param {Element} elem - The DOM element in question.
 */
function getInputElement(elem) {
  var checkboxClasses = ['mui-checkbox', 'mui-checkbox--inline'],
      radioClasses = ['mui-radio', 'mui-radio--inline'],
      toggleClasses = ['mui-toggle'];

  var inputProps = {}

  if (jqLite.hasClass(elem, checkboxClasses)) {
    inputProps.type = 'checkbox';
  } else if (jqLite.hasClass(elem, radioClasses)) {
    inputProps.type = 'radio';
  } else if (jqLite.hasClass(elem, toggleClasses)) {
    inputProps.type = 'toggle';
  } else {
    return null;
  }

  var inputEl = elem.getElementsByTagName('INPUT')[0];
  inputProps.checked = (inputEl && inputEl.checked);

  return inputProps;
}


/**
 * Add ripple effects to button element.
 * @param {Element} buttonEl - The button element.
 */
function initialize(buttonEl) {
  // check flag
  if (buttonEl._muiRipple === true) return;
  else buttonEl._muiRipple = true;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // attach event handler
  jqLite.on(buttonEl, 'touchstart', eventHandler);
  jqLite.on(buttonEl, 'mousedown', eventHandler);
}


/**
 * Event handler
 * @param {Event} ev - The DOM event
 */
function eventHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var buttonEl = this;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;

  // de-dupe touchstart and mousedown with 100msec flag
  if (buttonEl.touchFlag === true) {
    return;
  } else {
    buttonEl.touchFlag = true;
    setTimeout(function() {
      buttonEl.touchFlag = false;
    }, 100);
  }

  // create the ripple element
  var rippleEl = document.createElement('div');

  var offset = jqLite.offset(buttonEl),
      xPos = ev.pageX - offset.left,
      yPos = ev.pageY - offset.top,
      diameter,
      radius,
      colorCls,
      rippleTop,
      rippleLeft;

  // determine color of the ripple for
  // true/false elements like checkboxes, radios, toggles
  var maybeInputProps = getInputElement(buttonEl);
  if (maybeInputProps === null) {
    // not a true/false input, so calculate radius of the ripple based on its container size
    radius = Math.max(buttonEl.clientWidth, buttonEl.clientHeight) * 1.3;
    rippleTop = yPos - radius;
    rippleLeft = xPos - radius;
  } else {
    //inputs are all about 20px tall
    radius = 35;
    // center the ripple on the input element
    rippleTop = 10 - radius;
    rippleLeft = 10 - radius;
    // ripple color changes with 'checked' state
    if (maybeInputProps.checked && maybeInputProps.type !== 'radio') {
      colorCls = 'mui-ripple-effect--true';
      // toggle switch ripple origin shifts
      if (maybeInputProps.type === 'toggle') {
        rippleTop = 10 - radius;
        rippleLeft = 30 - radius;
      }
    } else {
      colorCls = 'mui-ripple-effect--false';
    }
  }

  // calculate diameter of ripple
  diameter = radius * 2;

  // add CSS classes to the ripple element
  rippleEl.className = rippleClass + ' ' + colorCls;

  jqLite.css(rippleEl, {
    height: diameter + 'px',
    width: diameter + 'px',
    top: rippleTop + 'px',
    left: rippleLeft + 'px'
  });

  buttonEl.appendChild(rippleEl);

  window.setTimeout(function() {
    var parentNode = rippleEl.parentNode;
    if (parentNode) parentNode.removeChild(rippleEl);
  }, 2000);
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var btnList = doc.getElementsByClassName(btnClass);
    for (var i=btnList.length - 1; i >= 0; i--) initialize(btnList[i]);

    var elList = doc.getElementsByClassName(addRippleClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (jqLite.hasClass(el, btnClass) || jqLite.hasClass(el, addRippleClass)) initialize(el);
    });
  }
};
