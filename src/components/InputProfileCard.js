import React from 'react';

const Input = (props) => {
  let inputClassName = 'form-control';

  if (props.type === 'file') {
    inputClassName += '-file';
  }
  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
  }

  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input
        className={inputClassName}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.hasError && (
        <span className="invalid-feedback-forprofileCard">{props.error}</span>
      )}
    </div>
  );
};

Input.defaultProps = {
  onChange: () => {}
};

export default Input;