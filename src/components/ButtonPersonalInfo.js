import React from 'react';

const ButtonPersonalInfo = (props) => {
    return(
        <button
          className="btn editProfile p-2"
        >
          {props.values}
          <span className="text-button-confirmation">{props.value}</span>
          <i className="fas fa-arrow-right fa-lg pb-1 pl-3 arrowIcon-button"></i>

        </button>
    )
}

export default ButtonPersonalInfo;