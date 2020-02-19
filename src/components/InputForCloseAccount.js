import React from 'react';

const InputForCloseAccount = (props) => {
  let inputClassName = 'form-control form-group-closeAccount my-2 p-2 input';
  
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

InputForCloseAccount.defaultProps = {
  onChange: () => {}
};

export default InputForCloseAccount;