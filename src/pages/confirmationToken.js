import React, { Component } from 'react';
import queryString from 'query-string';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import yes_icon from '../assets/yes-icon.jpg';
import exclamation_icon from '../assets/exclamation-icon.png';
import { connect } from 'react-redux';
import ButtonWithProgressEmailConfirmation from '../components/ButtonWithProgressEmailConfirmation';
import { Link } from 'react-router-dom';


class confirmationToken extends Component {
    state = { 
        token: this.props.match.params.token,
        isLoadingToken: false,
        error: false,
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
            isLoadingToken: true,

            isLoadingResponse: false,
            response: null,
            apiError: null
        })
        
        apiCalls.confirmationToken(params.token)
        .then((response) => {
            console.log('response => ', response)
            this.setState({
                isLoadingToken: false,
                error: false
            }, () => {
                const action = {
                    type: 'confirmation-token'
                };
                this.props.dispatch(action);
            })
        })
        .catch((e) => {
            this.setState({ 
                isLoadingToken: false,
                error: true
                });
        })

    };

    render() {
        // let url = this.props.location.search;
        // let params = queryString.parse(url);
        // console.log(params);

        let pageContent;
        if(this.state.isLoadingToken) {
            pageContent = (
                <Spinner value="Loading..."/>
            );
        } else if (this.state.error === false) {
            pageContent = (
                <div>
                    <div className="container card d-flex p-1 card-confirmation shadow-sm">
                        <div className="alert text-center pb-0 mb-0" role="alert">
                            <div className=""> 
                                <img className="m-auto pl-3 pt-3" src={yes_icon} width="200" alt="Hoaxify" />
                            </div>

                            {/* <div>
                                <i className="fas fa-envelope-open-text mail-icon"></i>
                                <span className="text-span font-weight-bold"> &nbsp;You've got mail!</span>
                            </div> */}

                            <h4 className="pt-5 confirmation-header">
                                Your email has been successfully confirmed.
                            </h4>

                            <p className="text-secondary pt-4 textConfirmation">
                                
                                The changes were successful, please check the Email Verification Status in 
                                "My Profile" to make sure the change.
                                <br></br>
                                In 5 seconds you will be redirected to the Home Page.
                                <span className="font-weight-bold"></span>
   
                            </p>

                            {this.state.successfullyMessage && (
                                
                                <h5 className="text-success font-weight-bold pt-3 text-center success-text-resend"> 
                                    <span className="far fa-check-circle fa-lg fa-2x"></span>
                                    <span className="">&nbsp;Email Resending was successfully!</span>
                                </h5>
                            )}

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

        } else {
            pageContent = (
                <div>
                    <div className="container card d-flex p-1 card-confirmation shadow-sm">
                        <div className="alert text-center pb-0 mb-0" role="alert">
                            <div className=""> 
                                <img className="m-auto pl-3 pt-3" src={exclamation_icon} width="200" alt="Hoaxify" />
                            </div>

                            {/* <div>
                                <i className="fas fa-envelope-open-text mail-icon"></i>
                                <span className="text-span font-weight-bold"> &nbsp;You've got mail!</span>
                            </div> */}

                            <h4 className="pt-5 confirmation-header">
                                Something went wrong!
                            </h4>

                            <p className="text-secondary pt-4 textConfirmation">
                                You must be authenticated and submit a valid token within the url.
                            </p>

                            {this.state.successfullyMessage && (
                                
                                <h5 className="text-success font-weight-bold pt-3 text-center success-text-resend"> 
                                    <span className="far fa-check-circle fa-lg fa-2x"></span>
                                    <span className="">&nbsp;Something went wrong!</span>
                                </h5>
                            )}

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

        return (
            <div className="">
                {/* <p>Test confirmationToken page: {this.state.token}</p> */}
                {pageContent}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    };
};

export default connect(mapStateToProps)(confirmationToken);