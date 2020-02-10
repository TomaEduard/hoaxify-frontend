import React, { Component } from 'react'
import { connect } from 'react-redux';
import image from '../assets/confirmationEmail.png';
import ButtonWithProgressEmailConfirmation from '../components/ButtonWithProgressEmailConfirmation';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import * as apiCalls from '../api/apiCalls';

class ResendConfirmationEmail extends Component {
    state = {
        id: this.props.loggedInUser.id, 
        pendingApiCall : false,
        apiError: undefined,
        successfullyMessage: false,
        setButtonDisabled: false,
    };

    confirmationEmail = () => {
        this.setState({pendingApiCall: true});
        apiCalls.resendEmailVerification(this.state.id)
            .then((response) => {
            this.setState({
                pendingApiCall: false,
                successfullyMessage: true,
                setButtonDisabled: true,
            })
        })
        .catch((error) => {
        if (error.response) {
            this.setState({ 
                apiError: error.response.data.message,
                pendingApiCall: false,
            });
        }
        });
    }

   
    render() {
        
        return (
            <div className="">

                <div className="container card d-flex p-1 card-confirmation shadow-sm">
                    <div className="alert text-center pb-0 mb-0" role="alert">
                        <div className="login-logo"> 
                            <img className="m-auto pl-3 pt-1" src={image} width="270" alt="Hoaxify" />
                        </div>

                        <div>
                            <i className="fas fa-envelope-open-text mail-icon"></i>
                            <span className="text-span font-weight-bold"> &nbsp;You've got mail!</span>
                        </div>

                        <h4 className="pt-2 confirmation-header">
                            Check Your Email  
                        </h4>

                        <p className="text-secondary pt-2 textConfirmation">
                        The confirmation of the email is necessary to have access to all the functionalities of the application. A confirmation email has been sent to <span className="font-weight-bold">{this.props.loggedInUser.username}</span> at account creation. Please access the link inside it to confirm the email address.
                        If this email has not been sent successfully you can resend it using the button below.
                            
  
                            
                            
                            {/* Authentication is required to see this content.
                            <br />You need to&nbsp;
                            <a href="http://localhost:3000/#/login" className="text-secondary font-weight-bold"> 
                                Login
                            </a>
                            &nbsp;or&nbsp;
                            <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold"> 
                                Sign Up 
                            </a>
                            . */}
                        </p>

                        {this.state.successfullyMessage && (
                            
                            <h5 className="text-success font-weight-bold pt-3 text-center success-text-resend"> 
                                <span className="far fa-check-circle fa-lg fa-2x"></span>
                                <span className="">&nbsp;Email Resending was successfully!</span>
                            </h5>
                        )}

                        <div className="text-center pt-4">
                            <ButtonWithProgressEmailConfirmation
                                onClick={this.confirmationEmail}
                                // disabled={disableSubmit || this.state.pendingApiCall}
                                disabled={this.state.setButtonDisabled}
                                // pendingApiCall={this.state.pendingApiCall}
                                pendingApiCall={this.state.pendingApiCall}
                            />
                        </div>  



                        <p className="text-center display-5 text-secondary text-login-card-buttom pt-5">
                            Have trouble or confused? Please contact the support at: &nbsp;
                            <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold">
                                support@hoaxify.com
                            </a>
                            .
                        </p>
                  
                    </div>

                </div>
                
                <div className="container">

                    <div className="row p-0 mt-1">
                    <DropdownButton
                        className=""
                        as={ButtonGroup}
                        key="Primary"
                        id="dropdown-button-drop-up"
                        drop="up"
                        variant="transparent"
                        title="English(United States)"
                    >
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton>{' '}

                    <p className="text-secondary pl-5 pt-3 text-login-card-buttom">Help</p>
                    <p className="text-secondary pl-5 pt-3 text-login-card-buttom">Privacy</p>
                    </div>
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

export default connect(mapStateToProps)(ResendConfirmationEmail);