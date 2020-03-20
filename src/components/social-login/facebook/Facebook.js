import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
// import fbLogo from '../assets/fb-logo.png';
import fbLogo from '../../../assets/fb-logo.png';

export default class Facebook extends Component {
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
        let fbContent;
        
        if(this.state.isLoggedIn) {
            // fbContent = (
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
            fbContent = (
                <div className="row d-flex justify-content-center">
                    <img src={fbLogo} className="facebook-img" alt="Facebook" />
                    <FacebookLogin
                        appId="552418532297617"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="btn btn-block social-btn facebook"
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