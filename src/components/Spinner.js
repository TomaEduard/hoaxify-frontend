import React from 'react';

const Spinner = (props) => {
    return (
        <div className="container">
            <div className="d-flex pt-5 mt-5">
                <div className="spinner-border text-black-50 m-auto" style={{width: '3rem', height: '3rem'}}>
                    {/* <span className="sr-only">Loading...</span> */}
                </div>
            </div>
            <p className="text-center pt-2">{props.value}</p>
        </div>
    );
};

export default Spinner;