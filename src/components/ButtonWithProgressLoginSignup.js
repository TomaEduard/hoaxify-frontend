import React from 'react';

// .ButtonWithProgressEmailConfirmation {
//   background-color: #ffd930 !important;
//   width: 37% !important;
//   border-color: rgba(0, 0, 0, 0.041) !important;
//   margin-bottom: 0px !important;
//   padding-bottom: 0px !important;
// }

// .ButtonWithProgressEmailConfirmation:hover {
//   background-color: #fde475 !important;
//   transition: all .3s;
// }


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