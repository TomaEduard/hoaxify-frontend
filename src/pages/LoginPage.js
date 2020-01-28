import React from 'react';
import InputForLoginAndSignUp from '../components/InputForLoginAndSignUp';
import ButtonWithProgressLoginSignup from '../components/ButtonWithProgressLoginSignup';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions'; 
import defaultPicture from '../assets/profile.png';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './LoginPage.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import image from '../assets/2asd.png';

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


import {
  TwitterIcon,
  LinkedinIcon,
  LineIcon,
  PinterestIcon,
  FacebookIcon,
} from "react-share";

export class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    apiError: undefined,
    pendingApiCall : false
  };

  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({
      username: value,
      apiError: undefined
    });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({
      password: value,
      apiError: undefined
    });
  };

  onClickLogin = () => {
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    this.setState({pendingApiCall: true})

    // call reformating/rename postLogin dispatch function for jest 
    this.props.actions.postLogin(body)

    .then((response) => {
      this.setState({pendingApiCall: false}, () => {
        this.props.history.push('/');
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
  };

  render() {
    let disableSubmit = false;
    if (this.state.username === '') {
      disableSubmit = true;
    }
    if (this.state.password === '') {
      disableSubmit = true;
    }

    let imageSource = defaultPicture;

    return (
      // TODO: remove scrollbar on login page
      <div className="background-image" id="background-image" >


        <div className="container pt-5">

          <div className="row">
            <div className="contact-form col-lg-5 mt-3 shadow mb-5 bg-white pt-1">

              <div className="login-logo"> 
                <img className="m-auto pl-3 pt-3" src={image} width="270" alt="Hoaxify" />
              </div>

              <div className="card-body">

                {/* <h4 className="text-center">Login</h4> */}

                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    placeholder="Your username"
                    value={this.state.username}

                    onChange={this.onChangeUsername}
                    label="Your username"
                  />
                </div>

                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    placeholder="Your password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    label="Password"
                  />
                </div>

                {/* show error */}
                {this.state.apiError && (
                  <div className="alert alert-danger row shadow p-2 mb-2 rounded">
                    <div className="float-left">{this.state.apiError}</div>
                    <i className="fas fa-exclamation-triangle icon-exclamation-login-error ml-auto" />
                  </div>
                )}

                {/* <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                    
                {/* <div className="pt-4">
                  <div className=" custom-control-lg custom-control custom-checkbox">
                      <input className="custom-control-input" id="checkbox-large" type="checkbox"/>
                      <label className="custom-control-label" htmlFor="checkbox-large" >
                          Remember me
                      </label>
                  </div>
                </div> */}

                {/* <Accordion >
                  <Card className="border-0 pull-left">
                    <Card.Header className="bg-transparent pl-0" >
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" className="pl-0">
                        Forgot your password?
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" className="" >
                      <Card.Body className="card card-body shadow-sm bg-white rounded">
                        <p><a href="#" className="text-secondary">Reset password</a></p>
                        <p><a href="#" className="text-secondary">Secret answare</a></p>
                        <p><a href="#" className="text-secondary">Contact support</a></p>
                        <p><a href="#" className="text-secondary">Help</a></p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion> */}

                <div className="text-center">
                  <ButtonWithProgressLoginSignup
                    onClick={this.onClickLogin}
                    disabled={disableSubmit || this.state.pendingApiCall}
                    text="Login"
                    pendingApiCall={this.state.pendingApiCall}
                  />
                </div>
 
                <div className="text-center text-secondary pt-3">
                  <p>OR</p>

                  <div className="social-media-login-icons">
                    <TwitterIcon className="mr-2" size={40} round={false} style={{ cursor: 'pointer' }}/>
                    <FacebookIcon className="mr-2" size={40} round={false} style={{ cursor: 'pointer' }}/>
                    <LinkedinIcon className="mr-2" size={40} round={false} style={{ cursor: 'pointer' }}/>
                  </div>

                </div>

                <p className="text-center text-login-page text-secondary pt-3">By continuing, you agree to Hoxify's
                  <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold"> 
                    &nbsp;Terms of Service, Privacy Policy
                  </a>
                  &nbsp;and
                  <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold"> 
                    &nbsp;Cookie use.
                  </a>
                </p>

                <hr width="50%"></hr>

                <a className="not-on-hoaxify" href="http://localhost:3000/#/signup"> 
                  <p className="text-center">Not on hoaxify yet? Sign up</p>
                </a>

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
          </div>

        </div>
      </div>

    );
  }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({}))
  },
  dispatch: () => {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body))
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);