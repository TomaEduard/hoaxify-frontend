import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';

class UserPage extends Component {
    state = { 
        user: undefined,
        userNotFound: false
    };

    componentDidMount() {
        this.loadUser();
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.username !== this.props.match.params.username) {
            this.loadUser();
        }
    };

    loadUser = () => {
        const username = this.props.match.params.username;
        if(!username) {
            return;
        }

        apiCalls.getUser(username)
        .then(response => {
            this.setState({ 
                user: response.data,
                userNotFound: false,
            })
        })
        .catch(error => {
            this.setState({
                userNotFound: true,
            })
        })
    }

    render() { 
        if(this.state.userNotFound){
            return(
                // <div className="alert alert-danger text-center" role="alert">
                <div className="alert text-center pt-5" role="alert">
                    <i className="fas fa-exclamation-triangle fa-5x icon-exclamation" />
                    <h5 className="display-4 pt-2">User not found!</h5>
                    <p className="display-5 text-secondary secondaryTextUserNotFound">
                        If you think what you're looking for sould be here, please contact the support at: 
                        <a href="/"> support@hoaxify.com</a>
                    </p>
                </div>
       
            )
        }
        return (
            <div data-testid="userpage">
                {this.state.user && (<ProfileCard user={this.state.user} />)}
            </div>
        );
    }
}
UserPage.defaultProps = {
    match: {
        params: {

        }
    }
}


export default UserPage;