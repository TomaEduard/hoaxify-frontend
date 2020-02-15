import React from 'react';

const InputForLoginAndSignUp = (props) => {
  let inputClassName = 'form-control form-group my-2 p-2 input';
  
  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
  }
  
  return (
    <div >
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
        <span className="invalid-feedback InputForLoginAndSignUp">{props.error}</span>
      )}
    </div>
  );
};

InputForLoginAndSignUp.defaultProps = {
  onChange: () => {}
};

export default InputForLoginAndSignUp;