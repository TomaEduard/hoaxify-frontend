import React, { Component } from 'react'
import { connect } from 'react-redux';
import ButtonSecurityChangePassword from './ButtonSecurityChangePassword';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import changePassword from '../assets/changePassword.png';
import changeEmail from '../assets/changeEmail.png';
import * as apiCalls from '../api/apiCalls';

class Security extends Component {
    state = {
        id: this.props.loggedInUser.id, 

        // change password
        pendingApiCallChangePassword : false,
        apiErrorChangePassword: undefined,
        successfullyMessageChangePassword: false,
        setButtonDisabledChangePassword: false,

    };

    // Change password
    changePassword = () => {
        this.setState({pendingApiCallChangePassword: true});
        // Aici am ramas
        // apiCalls.resendEmailVerification(this.state.id)
        //     .then((response) => {
        //     this.setState({
        //         pendingApiCallChangePassword: false,
        //         successfullyMessageChangePassword: true,
        //         setButtonDisabledChangePassword: true,
        //     })
        // })
        // .catch((error) => {
        // if (error.response) {
        //     this.setState({ 
        //         apiErrorChangePassword: error.response.data.message,
        //         pendingApiCallChangePassword: false,
        //     });
        // }
        // });
    }

    render() {
        const { displayName, username, image, emailVerificationStatus } = this.props.user;

        return (
            <React.Fragment>

                {/* Change Email */}
                <div className="card mt-4 p-2 shadow-sm">
                    <Row>
                        <Col xs={12} md={12} lg={12} xl={8}>
                            <div className="card-body d-flex flex-column">
                                        
                                <div //  text-center 
                                    className="card-title textSettingsSecurityChangePassword pb-2">
                                        Change Email.
                                </div>

                                <h6 className="text-login-page text-secondary notClickable-text"> 
                                    <span className="">If you would like to change your email, 
                                    enter a new email in the field below. Before being able to log back in, 
                                    you will have to verify your new address by clicking the activation 
                                    link in the email we send to your new address.
                                    </span>
                                </h6>

                                <div className="text-center mt-3">
                                    <ButtonSecurityChangePassword
                                        onClick={this.changePassword}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        disabled={this.state.setButtonDisabledChangePassword}
                                        pendingApiCall={this.state.pendingApiCallChangePassword}
                                        pendingApiCall={false}
                                        value="Change Email"
                                    />
                                    
                                </div>  
                            </div>
                        </Col>

                        <Col xs={12} md={12} lg={12} xl={4}>
                            <div className="d-flex justify-content-center pr-5 pt-5 pb-2"> 
                                <img className="m-auto" src={changeEmail} width="100" alt="Hoaxify" />
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

                                <div className="text-center mt-3">
                                    <ButtonSecurityChangePassword
                                        onClick={this.changePassword}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        disabled={this.state.setButtonDisabledChangePassword}
                                        pendingApiCall={this.state.pendingApiCallChangePassword}
                                        pendingApiCall={false}
                                        value="Send Email&nbsp;&nbsp;"
                                    />
                                    
                                </div>  
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