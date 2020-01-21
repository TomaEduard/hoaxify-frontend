import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';

class UserPage extends Component {
    state = { 
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        inEditMode: false
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
        
        this.setState({
            userNotFound: false,
            isLoadingUser: true,
        })

        apiCalls.getUser(username)
        .then(response => {
            this.setState({ 
                user: response.data,
                isLoadingUser: false,    
            })
        })
        .catch(error => {
            this.setState({
                userNotFound: true,
                isLoadingUser: false,
            });
        });
    };

    onClickEdit = () => {
        this.setState({
            inEditMode: true
        })
    }

    onClickCancel = () => {
        this.setState({
            inEditMode: false
        })
    }

    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            displayName: this.state.user.displayName
        }
        apiCalls.updateUser(userId, userUpdate)
        .then((response) => {
            this.setState({
                inEditMode: false
            });
        });
    };

    onChangeDisplayName = (event) => {
        const user = { ...this.state.user };
        user.displayName = event.target.value;
        this.setState({user})
    }

    render() { 
        let pageContent;
        if(this.state.isLoadingUser){
            pageContent = (
                <div className="d-flex pt-5 mt-5">
                    <div className="spinner-border text-black-50 m-auto" style={{width: '3rem', height: '3rem'}}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        
            );
        } else if (this.state.userNotFound){
            pageContent = (
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
        } else {
            const isEditable = this.props.loggedInUser.username === this.props.match.params.username;
            pageContent = this.state.user && (
                <ProfileCard 
                    user={this.state.user}
                    isEditable={isEditable}
                    inEditMode={this.state.inEditMode}
                    onClickEdit={this.onClickEdit}
                    onClickCancel={this.onClickCancel}
                    onClickSave={this.onClickSave}
                    onChangeDisplayName={this.onChangeDisplayName}
                />)
        }
        return (
            <div data-testid="userpage">
                {pageContent}
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

const mapStateToProps = (state) => {
    return {
        loggedInUser: state,
    }
}

export default connect(mapStateToProps)(UserPage);