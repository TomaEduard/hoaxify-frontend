import React from 'react';

const ButtonWithProgressEmailConfirmation = (props) => {
    return(
        <button
          className="btn ButtonWithProgressEmailConfirmation p-3"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.values}
          <span className="text-button-confirmation">{props.value}</span>
          
          {props.pendingApiCall && (
            <div className="spinner-border spinner-border-sm mr-1">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          
          {!props.pendingApiCall && (
            <i className="fas fa-arrow-right fa-lg pb-1 arrowIcon-button"></i>
          )}

        </button>
    )
}

export default ButtonWithProgressEmailConfirmation;