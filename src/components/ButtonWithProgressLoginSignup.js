import React from 'react';

const ButtonWithProgressLoginSignup = (props) => {
    return(
        <button
          className="btn ButtonWithProgressLoginSignup"
          onClick={props.onClick}
          disabled={props.disabled}
      >
          {props.pendingApiCall && (
            <div className="spinner-border spinner-border-sm mr-1">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {props.text}
        </button>
    )
}

export default ButtonWithProgressLoginSignup;