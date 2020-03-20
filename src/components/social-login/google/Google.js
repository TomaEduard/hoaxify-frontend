import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
// import fbLogo from '../assets/fb-logo.png';
import googleLogo from '../../../assets/google-logo.png';
import GoogleLogin from 'react-google-login';

export default class Google extends Component {
    state = {
        isLoggedIn: false,
        name: '',
        email: '',
        picture: ''
    }

    componentClicked = () => {
        console.log('clicked');
    };

    responseFacebook = (response) => {
        // console.log(response);
        if (response.name && response.email && response.picture) {
            this.setState({
                isLoggedIn: true,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url
            });
        }
    };

    render() {
        let GoogleContent;
        
        if(this.state.isLoggedIn) {
            // GoogleContent = (
            //     <div style={{
            //         width: '400px',
            //         margin: 'auto',
            //         background: '#f4f4f4',
            //         padding: '20px'
            //     }}>
            //         <img src={this.state.picture} alt={this.state.name} />
            //         <h2>Welcome {this.state.name}</h2>
            //         Email: {this.state.email}
            //     </div>
            // );
        } else {
            GoogleContent = (
                <div className="row d-flex justify-content-center">
                    <img src={googleLogo} className="facebook-img" alt="Facebook" />
                    <FacebookLogin
                        appId="552418532297617"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="btn btn-block social-btn facebook"
                        textButton="Login with Facebook"
                    />

                    {/* 
                        // official sign in button image from facebook developer
                    <div 
                        className="fb-login-button" 
                        data-width="" 
                        data-size="large" 
                        data-button-type="login_with" 
                        data-layout="default" 
                        data-auto-logout-link="false" 
                        data-use-continue-as="false">
                    </div>*/}
                </div>
                
            )
        }

        return (
            <div>
                {GoogleContent}
            </div>
        )
    }
}