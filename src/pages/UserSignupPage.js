import React from 'react';
import InputForLoginAndSignUp from '../components/InputForLoginAndSignUp';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

      <div>

        <div className="card contact-form col-lg-5 mt-4 shadow p-3 mb-5 bg-white">

          <div className="card-body">

            <div className="signup-logo"> </div>

            <h4 className="text-center pt-4">Sign Up</h4>

            <div className="form-group py-4">
              <InputForLoginAndSignUp
                label="Display Name"
                placeholder="Your display name"
                value={this.state.displayName}
                onChange={this.onChangeDisplayName}
                hasError={this.state.errors.displayName && true}
                error={this.state.errors.displayName}
              />
            </div>
            <div className="form-group py-4">
              <InputForLoginAndSignUp
                label="Username"
                placeholder="Your username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                hasError={this.state.errors.username && true}
                error={this.state.errors.username}
              />
            </div>
            <div className="form-group py-4">
              <InputForLoginAndSignUp
                label="Password"
                placeholder="Your password"
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
              <ButtonWithProgress
                  onClick={this.onClickSignup}
                  disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                  pendingApiCall={this.state.pendingApiCall}
                  text="Sign Up"
                />
              </div>

            </div>
          </div>
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