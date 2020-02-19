import React, { Component } from 'react'
import { connect } from 'react-redux';
import ButtonSecurityChangePassword from './ButtonSecurityChangePassword';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import changePassword from '../assets/changePassword.png';
import changeEmail from '../assets/changeEmail.png';
import exclamationSecurity from '../assets/exclamationSecurity.png';
import * as apiCalls from '../api/apiCalls';

class Security extends Component {
    state = {
        id: this.props.loggedInUser.id, 

        // Email
        pendingApiCallChangeEmail: false,
        apiErrorChangeEmail: undefined,
        successfullyMessageChangeEmail: false,
        setButtonDisabledChangeEmail: false,
        apiErrorChangeEmail: false,
        successfullyEmailMessage: false,

        // Password

    };

    // Change email
    changeEmail = () => {
        this.setState({pendingApiCallChangeEmail: true});
        apiCalls.changeEmail(this.state.id)
            .then((response) => {
            this.setState({
                pendingApiCallChangeEmail: false,
                successfullyMessageChangeEmail: true,
                setButtonDisabledChangeEmail: true,
                successfullyEmailMessage: true,
            })
        })
        .catch((error) => {
        if (error.response) {
            this.setState({ 
                apiErrorChangeEmail: error.response.data.message,
                pendingApiCallChangeEmail: false,
                successfullyEmailMessage: false,
            });
        }
        });
    }

    render() {
        const { displayName, username, image, emailVerificationStatus } = this.props.user;

        return (
            <React.Fragment>

                <div className="card mt-4 verticalLine">
                    <Row>
                        <Col xs={11} md={11} lg={11} xl={10}>
                            <div className="card-body d-flex flex-column ">

                                <p className="text-secondary textSecurityTop mb-0">
                                    Many of the services offered use the security method to confirm the&nbsp;
                                     
                                    <span className="font-weight-bold mb-0">e-mail account holder. </span>
                                    
                                    <br></br>
                                    Please inform yourself before a useful service.&nbsp;
                                </p>

                            </div>
                        </Col>

                        <Col xs={1} md={1} lg={1} xl={2}>
                            <div className="d-flex justify-content-center exclamationSecurity pt-2"> 
                                <img className="m-auto" src={exclamationSecurity} width="32" alt="Hoaxify" />
                            </div>
                        </Col>
                        
                    </Row>
                </div>  

                {/* Change Email */}
                <div className="card mt-4 p-2 shadow-sm">
                    <Row>
                        <Col xs={12} md={12} lg={12} xl={8}>
                            <div className="card-body d-flex flex-column">
                                        
                                <div //  text-center 
                                    className="card-title textSettingsSecurityChangePassword pb-2">
                                        Change Email
                                </div>

                                <h6 className="text-login-page text-secondary notClickable-text"> 
                                    <span className="">If you would like to change your email, 
                                    enter a new email in the field below. Before being able to log back in, 
                                    you will have to verify your new address by clicking the activation 
                                    link in the email we send to your new address.
                                    </span>
                                </h6>

                                {this.state.successfullyEmailMessage && (
                                    <h5 className=" font-weight-bold pt-3 text-center success-text-resend"> 
                                        <span className="text-success far fa-check-circle fa-lg fa-1x"></span>
                                        <span className="text-success">
                                            &nbsp;The email has been successfully send!
                                            <br></br> 
                                            <span className="changeEmailSubtextSize text-secondary font-weight-light">*Check in inbox/promotions/spam tabs.</span>
                                        </span>
                                    </h5>
                                )}

                                <div className="text-center mt-3 ml-auto d-flex col-xs-12 col-md-12 col-lg-12 col-xl-5">
                                    <ButtonSecurityChangePassword
                                        onClick={this.changeEmail}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        disabled={this.state.setButtonDisabledChangeEmail}
                                        pendingApiCall={this.state.pendingApiCallChangeEmail}
                                        value="Change Email"
                                    />
                                </div>  
                            </div>
                        </Col>

                        <Col xs={12} md={12} lg={12} xl={4}>
                            <div className="d-flex justify-content-center pr-5 pt-5 pb-2 "> 
                                <img className="m-auto" src={changeEmail} width="112" alt="Hoaxify" />
                            </div>
                        </Col>
                        
                    </Row>
                </div>  

                {/* Change Password */}
                <div className="card mt-4 p-2 shadow-sm">
                    <Row>
                        <Col xs={12} md={12} lg={12} xl={8}>
                            <div className="card-body d-flex flex-column">
                                        
                                <div //  text-center 
                                    className="card-title textSettingsSecurityChangePassword pb-2">
                                        Change password with the help of email.
                                </div>

                                <h6 className="text-login-page text-secondary notClickable-text"> 
                                    <span className="">By confirming this request you will be sent an email with 
                                        instructions on how to change your password.<br></br>  
                                        Are you sure you want to do this?
                                    </span>
                                </h6>

                                <div className="text-center mt-3 col-xs-12 col-md-12 col-lg-12 col-xl-5">
                                    <ButtonSecurityChangePassword
                                        onClick={this.changePassword}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        disabled={this.state.setButtonDisabledChangePassword}
                                        pendingApiCall={this.state.pendingApiCallChangePassword}
                                        pendingApiCall={false}
                                        value="Send Email&nbsp;&nbsp;"
                                    />
                                </div>  
                                <span className="changeEmailSubtextSize text-secondary font-weight-light pl-3">
                                    *Not implemented yet.
                                </span>

                            </div>
                        </Col>

                        <Col xs={12} md={12} lg={12} xl={4}>
                            <div className="d-flex justify-content-center pr-5 pt-5 pb-2"> 
                                <img className="m-auto" src={changePassword} width="230" alt="Hoaxify" />
                            </div>
                        </Col>
                        
                    </Row>
                </div>                    

 

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(Security);