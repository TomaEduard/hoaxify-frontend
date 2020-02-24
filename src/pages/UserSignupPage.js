import React from 'react';
import InputForLoginAndSignUp from '../components/InputForLoginAndSignUp';
import ButtonWithProgressLoginSignup from '../components/ButtonWithProgressLoginSignup';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import image from '../assets/2asd.png';

export class UserSignupPage extends React.Component {
  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: '',
    pendingApiCall: false,
    errors: {},
    passwordRepeatConfirmed: true,

  };

  onChangeDisplayName = (event) => {
    const value = event.target.value;
    const errors = {...this.state.errors};
    delete errors.displayName;
    this.setState({ displayName: value, errors });
  };

  onChangeUsername = (event) => {
    const value = event.target.value;
    const errors = {...this.state.errors};
    delete errors.username;
    this.setState({ username: value, errors });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    // compare value
    const passwordRepeatConfirmed = this.state.passwordRepeat === value;
    const errors = {...this.state.errors};
    delete errors.password;
    errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Does not match to password'
    this.setState({ password: value, passwordRepeatConfirmed, errors });
  };

  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    const passwordRepeatConfirmed = this.state.password === value;
    const errors = {...this.state.errors};
    errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Does not match to password'
    this.setState({ passwordRepeat: value, passwordRepeatConfirmed, errors });
  };

  onClickSignup = () => {
    const user = {
      username: this.state.username,
      displayName: this.state.displayName,
      password: this.state.password
    };
    this.setState({ pendingApiCall: true });
    
    this.props.actions.postSignup(user)
      .then((response) => {
        this.setState({ pendingApiCall: false }, () => 
          this.props.history.push('/')
        );
      })
      .catch((apiError) => {
        
        let errors = { ...this.state.errors };
        if (apiError.response.data && apiError.response.data.validationErrors) {
          errors = { ...apiError.response.data.validationErrors };
        }
        this.setState({ pendingApiCall: false, errors });
      });
  };

  render() {
    return (

      <div className="background-image">

        <div className="container">

          <div className="row">
            <div className="contact-form col-lg-5 mt-3 shadow mb-5 bg-white  pt-1">

              <div className="d-flex justify-content-center"> 
                <img className="m-auto pl-3 pt-3" src={image} width="270" alt="Hoaxify" />
              </div>

              {/* <div className="separator">
                <span className="separator-span"></span>
              </div> */}

              <div className="card-body">

                {/* <h4 className="text-center pt-1">Sign Up</h4> */}

                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    label="Email"
                    placeholder="Email"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    hasError={this.state.errors.username && true}
                    error={this.state.errors.username}
                  />
                </div>
                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    label="Display Name"
                    placeholder="Display Name"
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName}
                    hasError={this.state.errors.displayName && true}
                    error={this.state.errors.displayName}
                  />
                </div>
                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    hasError={this.state.errors.password && true}
                    error={this.state.errors.password}
                  />
                </div>
                <div className="form-group py-4">
                  <InputForLoginAndSignUp
                    label="Password Repeat"
                    placeholder="Repeat your password"
                    type="password"
                    value={this.state.passwordRepeat}
                    onChange={this.onChangePasswordRepeat}
                    hasError={this.state.errors.passwordRepeat && true}
                    error={this.state.errors.passwordRepeat}
                  />
                </div>
                <div className="text-center">

                  <div className="pull-right pt-3">
                  <ButtonWithProgressLoginSignup
                      onClick={this.onClickSignup}
                      disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                      pendingApiCall={this.state.pendingApiCall}
                      text="Sign Up"
                    />
                  </div>

                </div>

                <p className="text-center text-login-page text-secondary pt-2">Creating an account means you’re okay with Hoaxify’s&nbsp;
                  <a href="#/signup" className="text-secondary font-weight-bold"> 
                    Business Terms of Service
                  </a>
                  &nbsp;and&nbsp;
                  <a href="#/signup" className="text-secondary font-weight-bold"> 
                    Privacy Policy.</a>
                </p>

                <hr width="50%"></hr>

                <a className="not-on-hoaxify" href="#/login"> 
                  <p className="text-center">Already have an account? Sign In</p>
                </a>

                <div className="row p-0 mt-2">
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

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      })
  },
  history: {
    push: () => {}
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postSignup: (user) => dispatch(authActions.signupHandler(user))
    }
  };
};

export default connect(null, mapDispatchToProps) (UserSignupPage);