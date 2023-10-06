import React, { forwardRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import autosize from "autosize";

const AutoResizeTextBox = forwardRef((props, ref) => {
  const input = useRef()
  const className = "post-input event-name-input"

  function placeholder(input, text, onOff) {
    if (!input.current) {
      return
    }
    if (onOff) {
      input.current.placeholder = text
    }
    else {
      input.current.placeholder = ''
    }
  }

  useEffect(() => {
    autosize(input.current)
  }, [])

  return <textarea {...props}
    style={{ fontSize: 14 }}
    ref={(e) => {
      if (input) {
        input.current = e
      }
      if (ref) {
        ref.current = e;
      }
    }}
    className={props.className ? className + " " + props.className : className}
    onChange={(e) => { props.onChange(e); autosize(input.current) }}
    onFocus={() => { placeholder(input, props.placeholder, false) }}
    onBlur={() => { placeholder(input, props.placeholder, true) }}
  ></textarea>


})

AutoResizeTextBox.propTypes = {
  onChange: PropTypes.function,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  className: PropTypes.string
};

export default AutoResizeTextBox;

AutoResizeTextBox.displayName = 'AutoResizeTextBox'