import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from 'react-redux';
import ButtonWithProgressEmailConfirmation from '../components/ButtonWithProgressEmailConfirmation';
import { Link } from 'react-router-dom';
import InputForLoginAndSignUp from '../components/InputForLoginAndSignUp';
import ButtonWithProgressLoginSignup from '../components/ButtonWithProgressLoginSignup';

class ChangeEmail extends Component {
    state = { 
        token: this.props.match.params.token,

        email: '',
        emailRepeat: '',

        isLoadingToken: false,
        errors: {},

        successfullyMessage: false,
        emailRepeatConfirmed: false,
    }
    
    // let urlParams = new URLSearchParams(location.search);
    // if (urlParams.has('token')) {
    //     verifyToken(urlParams.get('token'))
    // }

    componentDidMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        // console.log('params => ',params);
        // console.log('params.token => ',params.token);
        
        this.setState ({
            token: params.token,
        })
    };

    onChangeEmail = (event) => {
        const value = event.target.value;
        const emailRepeatConfirmed = this.state.emailRepeat === value;
        const errors = {...this.state.errors};
        delete errors.newEmail;
        errors.emailRepeat = emailRepeatConfirmed ? '' : 'Does not match to email'
        this.setState({ email: value, emailRepeatConfirmed, errors });
    };
    
    onChangeEmailRepeat = (event) => {
        const value = event.target.value;
        const emailRepeatConfirmed = this.state.email === value;
        const errors = {...this.state.errors};
        errors.emailRepeat = emailRepeatConfirmed ? '' : 'Does not match to email'
        this.setState({ emailRepeat: value, emailRepeatConfirmed, errors });
    };
 
    onClickSave = () => {
        const data = ({
          "newEmail": this.state.email
        });
        this.setState({ pendingApiCall: true });
        const action = {
            type: 'logout-success'
        };

        apiCalls.saveChangeEmail(this.state.token, data)
            .then((response) => {
                this.setState({ 
                    pendingApiCall: false,
                    successfullyMessage: true,
                })
                // TODO: Need implement setTimeout 5000 "/"
            }, this.props.dispatch(action))

            .catch((apiError) => {
                console.log("#1 this.state.errors : ", this.state.errors);

                let newError = { ...this.state.errors };
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    newError = { ...apiError.response.data.validationErrors };
                }
                console.log("#2 newError : ", newError);

                this.setState({ 
                    pendingApiCall: false, 
                    errors: newError 
                });

                console.log("#3 this.state.errors : ", this.state.errors);

            });


    };

    handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push('/');
    }

    render() {

        return (
            <div className="">

                <div className="containerChangeEmail card d-flex shadow-sm mt-2 col-xs-12 col-md-8 col-lg-7 col-xl-5">
                    <div className="alert pb-0 mb-0" role="alert">
                        {/* <div className="login-logo">  */}
                            {/* <img className="m-auto pl-3 pt-1" src={image} width="270" alt="Hoaxify" /> */}
                        {/* </div> */}

                        {/* <div>
                            <i className="fas fa-envelope-open-text mail-icon"></i>
                            <span className="text-span font-weight-bold"> &nbsp;You've got mail!</span>
                        </div> */}

                        <h4 className="pt-1 confirmation-header text-center">
                            Change Email
                        </h4>

                        <p className="text-secondary pt-3 textConfirmation text-left">
                        If you would like to change your email, enter a new email in the field below. 
                        Before being able to log back in, you will have to verify your new address by 
                        clicking the activation link in the email we send to your new address.&nbsp;
                        {/* <span className="font-weight-bold">Test</span> */}
                        </p>
                        <div className="form-group py-4 pt-5">
                            <InputForLoginAndSignUp
                                label="New Email Address"
                                placeholder="New Email Address"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                hasError={this.state.errors.newEmail && true}
                                error={this.state.errors.newEmail}
                            />
                        </div>

                        <div className="form-group py-4">
                            <InputForLoginAndSignUp
                                label="New Email Address Repeat"
                                placeholder="Repeat your email"
                                value={this.state.emailRepeat}
                                onChange={this.onChangeEmailRepeat}
                                hasError={this.state.errors.newEmail && true}
                                error={this.state.errors.newEmail}
                            />
                        </div>

                        {/* <div className="form-group py-4">
                            <InputForLoginAndSignUp
                                label="Repeat New Email Address"
                                placeholder="Repeat New Email Address"
                                value={this.state.passwordRepeat}
                                onChange={this.onChangePasswordRepeat}
                                hasError={this.state.errors.passwordRepeat && true}
                                error={this.state.errors}
                            />
                        </div> */}

                        {this.state.successfullyMessage && (
                            <h5 className="text-success font-weight-bold pt-3 text-center success-text-resend"> 
                                <span className="far fa-check-circle fa-lg fa-2x"></span>
                                <span className="">&nbsp;The email has been successfully changed!
                                <br></br> Please login again.</span>
                            </h5>
                        )}

                        {this.state.successfullyMessage && (
                            <div className="text-center pt-4">
                                <Link to="/" className="list-group-item-action">
                                    <ButtonWithProgressEmailConfirmation
                                        // onClick={this.confirmationEmail}
                                        // disabled={disableSubmit || this.state.pendingApiCall}
                                        // disabled={this.state.setButtonDisabled}
                                        // pendingApiCall={this.state.pendingApiCall}
                                        // pendingApiCall={this.state.pendingApiCall}
                                        value="Back to Home Page &nbsp;&nbsp;"
                                    />
                                </Link>
                            </div> 
                        )}

                        {!this.state.successfullyMessage && (
                            <div className="pull-right pt-3">
                                <ButtonWithProgressLoginSignup
                                    onClick={this.onClickSave}
                                    disabled={this.state.pendingApiCall || !this.state.emailRepeatConfirmed}
                                    pendingApiCall={this.state.pendingApiCall}
                                    text="Save"
                                />
                            </div>
                        )}

                        {/* <div className="text-center pt-4">
                            <ButtonWithProgressEmailConfirmation
                                // onClick={this.confirmationEmail}
                                // disabled={disableSubmit || this.state.pendingApiCall}
                                disabled={this.state.setButtonDisabled || !this.state.emailRepeatConfirmed}
                                // pendingApiCall={this.state.pendingApiCall}
                                value="Save &nbsp;&nbsp;"
                            />
                        </div>   */}

                        <p className="text-center display-5 text-secondary text-login-card-buttom pt-5">
                            Have trouble or confused? Please contact the support at: &nbsp;
                            <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold">
                                support@hoaxify.com
                            </a>
                            .
                        </p>
                
                    </div>

                </div>

                <div className="containerChangeEmail col-xs-12 col-md-8 col-lg-7 col-xl-5">

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
        user: state
    };
};

export default connect(mapStateToProps)(ChangeEmail);