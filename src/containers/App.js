import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
import ResendConfirmationEmail from '../pages/ResendConfirmationEmail';
import ChangeEmail from '../pages/ChangeEmail';

import ConfirmationToken from '../pages/confirmationToken';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
// const App = () => {
  render() {
  return (
    <div className="">

      <TopBar />

      <div className="">

        {/* <Route exact path="/">
          {store.isLoggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
        </Route> */}

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={UserSignupPage} />     
              
          <Route exact path="/verification/changeEmail" component={ChangeEmail}/> 
          <Route exact path="/verification/confirmationToken" component={ConfirmationToken}/> 
          {/* {!this.props.loggedInUser.isLoggedIn ? <Redirect to="/login" /> 
            : <Route exact path="/verification/confirmationToken" component={ConfirmationToken} />
          } */}

          <Route exact path="/:username" component={UserPage}/> 

          {/* <Route exact path="/verification/confirmationEmail" component={ResendConfirmationEmail} /> */}
          {!this.props.loggedInUser.isLoggedIn ? <Redirect to="/login" /> 
          : <Route exact path="/verification/confirmationEmail" component={ResendConfirmationEmail} />}
          

        </Switch>

      </div>

    </div>
  );
  }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(App);
