import React from 'react';

const ButtonWithProgressEmailConfirmation = (props) => {
    return(
        <button
          className="btn ButtonWithProgressEmailConfirmation p-3"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.pendingApiCall && (
            <div className="spinner-border spinner-border-sm mr-1">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <span className="text-button-confirmation">Resend Confirmation Email &nbsp;&nbsp;</span><i className="fas fa-arrow-right fa-lg"></i>
        </button>
    )
}

export default ButtonWithProgressEmailConfirmation;