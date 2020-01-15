import React from 'react';

const Input = (props) => {

    let inputClassName = 'form-control';

    if(props.hasError !== undefined) {
        // inputClassName += props.hasError ? ' is-valid' : ' is-invalid';
        if(props.hasError === false) {
            inputClassName += ' is-valid';
        } else {
            inputClassName += ' is-invalid';
        }
    }


    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input 
                className={inputClassName}
                type = {props.type || 'text'} 
                placeholder={props.placeholder} 
                value={props.value}
                onChange={props.onChange}
            />
            {props.hasError && <span className="invalid-feedback">{props.error}</span>}
        </div>
    );
;}

// default props
Input.defaultProps = {
    onChange: () => {

    }
};

export default Input;
