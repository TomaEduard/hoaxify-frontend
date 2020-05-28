import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as authActions from '../../../redux/authActions'; 
import { connect } from 'react-redux';

export class Facebook extends Component {
    state = {
        isLoggedIn: false,
        name: '',
        email: '',
        picture: '',
        provider: '',
        apiError: undefined
    }

    componentClicked = () => {
        console.log('clicked');
    };

    responseFacebook = (response) => {
        console.log(response);
        if (response.name && response.email && response.picture) {
            this.setState({
                isLoggedIn: true,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                provider: 'facebook'
            });

            const body = {
                username: this.state.email,
                displayName: this.state.name,
                image: this.state.picture,
                provider: this.state.provider
            };
            console.log("#0: ", body);
            
            this.props.actions.postLogin(body)
            .then((response) => {
                console.log("#5: ", body);

                this.props.history.push('/');
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({ 
                        apiError: error.response.data.message,
                    });
                }
            });

            
        } else {
            this.setState({
                isLoggedIn: false,
                name: '',
                email: '',
                picture: '',
                provider: '',
                apiError: undefined
            });
        }
    };

    text = 'Login with Facebook'

    render() {
        let fbContent;
        
        if(this.state.isLoggedIn) {

        } else {
            fbContent = (
                <div className="row d-flex justify-content-center pt-3">

                    <FacebookLogin
                        appId="552418532297617"
                        // autoLoad='true'
                        isDisabled={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        // cssClass="kep-login-facebook fab fa-facebook"
                        cssClass="login-facebook fab fa-facebook"
                        // icon={<fbLogo />}
                        textButton={this.text}
                        tag='button'
                    />

                </div>
                
            )
        }

        return (
            <div>
            {fbContent}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandlerFacebook(body))
    }
  };
};

export default connect(null, mapDispatchToProps)(Facebook);