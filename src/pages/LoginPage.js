import React from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions'; 
import defaultPicture from '../assets/profile.png';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './LoginPage.css';

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
        
      <div>
      
        <h4 className="text-center pt-4">Login</h4>
        {/* <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4 mb-3"> */}
        <div className="col-sm-12 ol-md-6 col-lg-5 col-xl-4 mr-md-auto mb-3">
          <Input
            label="Username"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        
        <div className="col-12 mb-3">
          <Input
            label="Password"
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
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
            
        <div className="m-3">

          <div className="custom-control-lg custom-control custom-checkbox">
              <input className="custom-control-input" id="checkbox-large" type="checkbox"/>
              <label className="custom-control-label" htmlFor="checkbox-large" >
                  Remember me
              </label>
          </div>
        </div>

        <div className="text-center">
          <ButtonWithProgress
              onClick={this.onClickLogin}
              disabled={disableSubmit || this.state.pendingApiCall}
              text="Login"
              pendingApiCall={this.state.pendingApiCall}
          />
        </div>

        {/* <div className="container mt-5" >
          <p><a href="#" className="text-secondary">Need help signing in?</a></p>
        </div> */}
        
        <Accordion >
          <Card className="border-0 bg-transparent">
            <Card.Header className="p-0 m-0 bg-transparent border-0">
              <Accordion.Toggle as={Button} variant="link" eventKey="0" className="p-0 m-0">
                Need help signing in?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" >
              <Card.Body className="p-2 m-2">
                <p><a href="#" className="text-secondary">Forgot password?</a></p>
                <p><a href="#" className="text-secondary">Help</a></p>
                
              </Card.Body>

            </Accordion.Collapse>
          </Card>
        </Accordion>
      
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