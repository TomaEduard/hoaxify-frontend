import React from 'react';

const ButtonWithProgress = (props) => {

  // ButtonWithProgress
    return(
        <button
            className={props.className || 'btn btn-primary'}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.pendingApiCall && (
              <div className="spinner-border text-light spinner-border-sm mr-1">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {props.text}
        </button>
    )
}

export default ButtonWithProgress;