import React from 'react';
import InputForLoginAndSignUp from '../components/InputForLoginAndSignUp';
import ButtonWithProgress from '../components/ButtonWithProgress';
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

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


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

    // call reformating postLogin function for jest 
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
        
      <div className="">
        
        <div className="row">

          <div className="contact-form col-lg-5 mt-5 shadow p-3 mb-5 bg-white">

            <div className="login-logo"> </div>

            <div className="card-body">

              <h4 className="text-center">Login</h4>

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
                <div className="col-12 mb-3">
                  <div className="alert alert-danger text-center">{this.state.apiError}</div>
                </div>
              )}

              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
                  
              <div className="pt-4">

                <div className=" custom-control-lg custom-control custom-checkbox">
                    <input className="custom-control-input" id="checkbox-large" type="checkbox"/>
                    <label className="custom-control-label" htmlFor="checkbox-large" >
                        Remember me
                    </label>
                </div>
              </div>

              <p className="pt-3">No account?<a href="http://localhost:3000/#/signup"> Create one!</a></p>

              <div className="pt-4">

                <div className="text-center pull-right">
                  <ButtonWithProgress
                      onClick={this.onClickLogin}
                      disabled={disableSubmit || this.state.pendingApiCall}
                      text="Login"
                      pendingApiCall={this.state.pendingApiCall}
                  />
                </div>

                <Accordion >
                  <Card className="border-0 pull-left">
                    <Card.Header className="bg-transparent pl-0" >
                      <Accordion.Toggle as={Button} variant="link" eventKey="0" className="pl-0">
                        Forgot my password
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
                </Accordion>

                

              </div>
            </div>
          </div>

          {/* right image icon */}
          <div className="col-lg-7 app-icon-login" />

        </div>    
          
          <div className="col-lg-5 pull-left">
            <div className="row">

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

              <p className="text-secondary pl-5 pt-3">Help</p>
              <p className="text-secondary pl-5 pt-3">Privacy</p>
              <p className="text-secondary pl-5 pt-3">Terms</p>

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