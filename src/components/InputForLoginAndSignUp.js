import React from 'react';

const Input = (props) => {
  let inputClassName = 'form-control form-group my-2 p-2 input';
  
  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
  }
  
  return (
    <div >

      {/* {props.label && <label>{props.label}</label>} */}
      <input
        className={inputClassName}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <label className="label">
        {props.label}
      </label>
      {props.hasError && (
        <span className="invalid-feedback">{props.error}</span>
      )}
    </div>
  );
};

Input.defaultProps = {
  onChange: () => {}
};

export default Input;