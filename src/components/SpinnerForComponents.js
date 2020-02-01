import React from 'react';

const SpinnerForComponents = (props) => {
    return (
        <div className="container">
            <div className="d-flex">
                <div 
                    className="spinner-border text-black-50 m-auto pt-1" 
                    style={{width: '2rem', height: '2rem'}}
                />
            </div>
            <p className="text-center mt-2 mb-0">{props.value}</p>
        </div>
    );
};

export default SpinnerForComponents;