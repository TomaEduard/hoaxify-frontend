import React from 'react';
import { Route, Switch} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';
import ResendConfirmationEmail from '../pages/ResendConfirmationEmail';
import Email_Verification from '../pages/Email_Verification';
import './App.css';

function App() {
  return (
    <div className="">

      <TopBar />

      <div className="">

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={UserSignupPage} />
          <Route exact path="/verification/confirmationEmail" component={ResendConfirmationEmail} />
          <Route path="/verification/email_verification" component={Email_Verification} />

          <Route path="/:username" component={UserPage} />
        </Switch>

      </div>

    </div>
  );
}

export default App;
