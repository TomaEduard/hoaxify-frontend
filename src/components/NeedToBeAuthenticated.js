import React, { Component } from 'react'
import { connect } from 'react-redux';
import image from '../assets/authenticated.png';

class NeedToBeAuthenticated extends Component {
   

    render() {
        
        return (
            <div className="card d-flex p-1 shadow-sm">
             
                <div className="alert text-center pt-4" role="alert">
                    <div className="login-logo"> 
                        <img className="m-auto pl-3" src={image} width="270" alt="Hoaxify" />
                    </div>
                    {/* <i className="fas fa-exclamation-triangle fa-5x icon-exclamation" /> */}
                    <h5 className="display-5 pt-2 textNeedToBeAuthenticated-header">
                        Unauthorized to see this content!
                    </h5>

                    <p className="display-5 text-secondary pt-2 textNeedToBeAuthenticated-body">
                        Authentication is required to see this content.
                        <br />You need to&nbsp;
                        <a href="http://localhost:3000/#/login" className="text-secondary font-weight-bold"> 
                            Login
                        </a>
                        &nbsp;or&nbsp;
                        <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold"> 
                            Sign Up
                        </a>
                        .
                    </p>

                    <p className="display-5 text-secondary textNeedToBeAuthenticated pt-5">
                        If you think what you're looking for sould be here, please contact the support at: 
                        <a href="/"> support@hoaxify.com</a>
                    </p>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(NeedToBeAuthenticated);