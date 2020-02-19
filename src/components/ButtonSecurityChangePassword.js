import React from 'react';

const ButtonSecurityChangePassword = (props) => {
    return(
        <button
          className="btn ButtonSecurityChangePassword p-2 m-auto"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.values}
          <span className="text-button-confirmation">{props.value}</span>
          
          {props.pendingApiCall && (
            <div className="spinner-border spinner-border-sm mr-1 ml-1">
              <span className="sr-only"> Loading...</span>
            </div>
          )}
          
          {/* {!props.pendingApiCall && (
            <i className="fas fa-arrow-right fa-lg pb-1 arrowIcon-button"></i>
          )} */}

        </button>
    )
}

export default ButtonSecurityChangePassword;