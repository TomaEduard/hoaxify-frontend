import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';

class UserPage extends Component {
    state = { 
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        inEditMode: false,
        originalDisplayName: undefined,
        pendingUpdateCall: false,
        image: undefined,
        errors: {},
        
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
        const user = { ...this.state.user }
        if (this.state.originalDisplayName !== undefined) {
            user.displayName = this.state.originalDisplayName;
        }
        this.setState({
            user,
            errors: {},
            originalDisplayName: undefined,
            inEditMode: false,
            image: undefined,
        })
    }

    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            displayName: this.state.user.displayName,
            image: this.state.image && this.state.image.split(',')[1]
        };
        this.setState({ pendingUpdateCall: true })
        apiCalls
            .updateUser(userId, userUpdate)
            .then((response) => {

                const user = { ...this.state.user }
                user.image = response.data.image;

                this.setState({
                    inEditMode: false,
                    originalDisplayName: undefined,
                    pendingUpdateCall: false,
                    user,
                    image: undefined,
                     
                });
            })
            .catch((error) => {
                let errors = {};
                if(error.response.data.validationErrors) {
                    errors = error.response.data.validationErrors;
                }
                this.setState({
                    pendingUpdateCall: false,
                    errors: error.response.data.validationErrors,
                     
                });
            });
    };

    onChangeDisplayName = (event) => {
        const user = { ...this.state.user };
        let originalDisplayName = this.state.originalDisplayName;
        if (originalDisplayName === undefined) {
            originalDisplayName = user.displayName;
        }
        user.displayName = event.target.value;

        const errors = { ...this.state.errors };
        // set errors undefined
        errors.displayName = undefined;
        // update errors in state
        this.setState({ user, originalDisplayName, errors })

        this.setState({user, originalDisplayName})
    }

    // Set your color here
    entering = (e) => {
        // e.children[0].style.borderTopColor = 'green';
        e.children[1].style.backgroundColor = 'rgba(0,0,0,0.4)';
    };

    onFileSelect = (event) => {
        // make sure the file array contain 1 file
        if(event.target.files.length === 0) {
            return;
        }

        const errors = { ...this.state.errors };
        errors.image = undefined

        const file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                errors
            })
        }

        reader.readAsDataURL(file);
    }

    render() { 
        let pageContent;
        if(this.state.isLoadingUser){
            pageContent = (

                <div className="container">
                    <div className="d-flex pt-5 mt-5">
                        <div className="spinner-border text-black-50 m-auto" style={{width: '3rem', height: '3rem'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <p className="text-center pt-2">Loading profile...</p>
                </div>
            );

        } else if (this.state.userNotFound){
            pageContent = (
                // <div className="alert alert-danger text-center" role="alert">
                <div className="alert text-center pt-5" role="alert">
                    <i className="fas fa-exclamation-triangle fa-5x icon-exclamation" />
                    <h5 className="display-4 pt-2">User not found</h5>
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
                    pendingUpdateCall={this.state.pendingUpdateCall}
                    entering={this.entering}
                    
                    // value of image
                    loadedImage={this.state.image}
                    // function for change image
                    onFileSelect={this.onFileSelect}

                    // error
                    errors={this.state.errors}
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