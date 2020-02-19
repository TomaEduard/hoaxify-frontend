import React, { Component } from 'react'
import { connect } from 'react-redux';
import ButtonSecurityChangePassword from './ButtonSecurityChangePassword';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputForCloseAccount from '../components/InputForCloseAccount';

class CloseAccount extends Component {
    state = {
        id: this.props.id,
        password: '',
        Userpassword: this.props.password,

        successfullyEmailMessage: false,
        // defaultValue: 'Enter your current password to continue...',
        // pendingApiCallChangeEmail: false,
        // apiErrorChangeEmail: undefined,
        // successfullyMessageChangeEmail: false,
        // setButtonDisabledChangeEmail: false,
        // apiErrorChangeEmail: false,
    };  

    onChangeEmail = (event) => {
        const value = event.target.value;
        // const errors = {...this.state.errors};
        // delete errors.newEmail;
        // this.setState({ password: value, errors });
        this.setState({ password: value });
    };

    onClickContinue = (event) => {
        const value = event.target.value;
        const emailRepeatConfirmed = this.state.email === value;
        const errors = {...this.state.errors};
        errors.emailRepeat = emailRepeatConfirmed ? '' : 'Does not match to email'
        this.setState({ emailRepeat: value, emailRepeatConfirmed, errors });
    };

    render() {
        
        return (
            <div className="">
               {/* Change Email */}
                <div className="card mt-4 p-2 shadow-sm">
                    <Row>
                        <Col xs={12} md={12} lg={12} xl={12}>
                            <div className="card-body d-flex flex-column">
                                        
                                <div //  text-center 
                                    className="card-title textSettingsSecurityChangePassword pb-2">
                                        Close Account
                                </div>

                                <h6 className="text-login-page text-secondary notClickable-text"> 
                                    <span className="">You've just entered the danger zone! If you
                                     would like to continue and remove your account, you can do so
                                      by entering your password below and confirming the prompts.
                                    </span>
                                </h6>
                               
                                <div className="form-group py-4 pt-2">
                                    <InputForCloseAccount
                                        label="Your current password"
                                        placeholder="Enter your current password to continue..."
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        // hasError={this.state.errors.newEmail && true}
                                        // error={this.state.errors.newEmail}
                                    />
                                </div>

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

                                <div className="text-center mt-3 ml-auto d-flex col-xs-12 col-md-6 col-lg-4 col-xl-4">
                                    <ButtonSecurityChangePassword
                                        onClick={this.changeEmail}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        disabled={this.state.setButtonDisabledChangeEmail}
                                        pendingApiCall={this.state.pendingApiCallChangeEmail}
                                        value="Continue"
                                    />
                                </div>  
                                    <span className="changeEmailSubtextSize text-secondary font-weight-light ml-auto d-flex col-xs-12 col-md-6 col-lg-4 col-xl-4">
                                        *Not implemented yet.
                                    </span>
                            </div>
                        </Col>

                        {/* <Col xs={12} md={12} lg={12} xl={4}>
                            <div className="d-flex justify-content-center pr-5 pt-5 pb-2 "> 
                                <img className="m-auto" src={changeEmail} width="112" alt="Hoaxify" />
                            </div>
                        </Col> */}
                        
                    </Row>
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

export default connect(mapStateToProps)(CloseAccount);