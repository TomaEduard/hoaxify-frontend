import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCardForOwner from '../components/ProfileCardForOwner';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';
import Spinner from '../components/Spinner';
import Home from '../components/Home';
import PersonalInfo from '../components/PersonalInfo';
import Security from '../components/Security';
import PeopleAndSharing from '../components/PeopleAndSharing';
import Communication from '../components/Communication';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            user: undefined,
            userNotFound: false,
            isLoadingUser: false,
            inEditMode: false,
            originalDisplayName: undefined,
            pendingUpdateCall: false,
            image: undefined,
            errors: {},
            // tabValue: '1',
            tabValue: (this.props.location.tabValue !== undefined ? this.props.location.tabValue : 1),
        };
        console.log("P1 After state: ", this.state.tabValue)
    };

    componentDidMount() {
        this.loadUser();
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.username !== this.props.match.params.username) {
            this.loadUser();
        }
        // if(prevProps.tabValue !== this.state.tabValue) {
        //     console.log("componentDidUpdate: ", prevProps.tabValue, (" - "), this.state.tabValue)
            // this.setState ({
            //     tabValue: this.props.location.tabValue
            // })
            // window.location.reload();
        // }
    };

    changeTabValue = (value) => {
        this.setState ({
            tabValue: 5,
        })
        console.log("changeTabValue: ", this.state.tabValue)

    }

    loadUser = () => {
        const username = this.props.match.params.username;
        if(!username) {
            return;
        };
        
        this.setState({
            userNotFound: false,
            isLoadingUser: true,
        });

        apiCalls.getUser(username)
        .then(response => {
            // console.log("c1: " + response.data.username);
            
            this.setState({ 
                user: response.data,
                isLoadingUser: false,    
            })
            // console.log("c2: " + this.state.user.username);

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
                }, () => {
                    const action = {
                        type: 'update-success',
                        payload: user
                    }
                    this.props.dispatch(action);
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
        };
        user.displayName = event.target.value;

        const errors = { ...this.state.errors };
        // set errors undefined
        errors.displayName = undefined;
        // update errors in state
        this.setState({ user, originalDisplayName, errors })

        this.setState({user, originalDisplayName})
    };

    // Set your color here
    entering = (e) => {
        // e.children[0].style.borderTopColor = 'green';
        e.children[1].style.backgroundColor = 'rgba(0,0,0,0.4)';
    };

    onFileSelect = (event) => {
        // make sure the file array contain 1 file
        if(event.target.files.length === 0) {
            return;
        };

        const errors = { ...this.state.errors };
        errors.image = undefined

        const file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                errors
            });
        };

        reader.readAsDataURL(file); 
    };
    render() { 
        console.log(" x1111111 this.props.state.tabValue =>", this.state.tabValue);

        let pageContent;
        if(this.state.isLoadingUser) {
            pageContent = (
                <Spinner value="Loading Profile..."/>
            );

        } else if (this.state.userNotFound) {
            pageContent = (
                // <div className="alert alert-danger text-center" role="alert">
                <div className="alert text-center pt-5" role="alert">
                    <i className="fas fa-exclamation-triangle fa-5x icon-exclamation" />
                    <h5 className="display-4 pt-2">User not found</h5>
                    <p className="text-secondary">
                        If you think what you're looking for sould be here, please contact the support at: 
                        <a href="/"> support@hoaxify.com</a>
                    </p>
                </div>
            )

        // if you are
        } else if (this.props.loggedInUser.username === this.props.match.params.username) {
            const isEditable = this.props.loggedInUser.username === this.props.match.params.username;
            
            pageContent = this.state.user && (
                <div className="container pt-2">

                    <Tab.Container 
                        id="left-tabs-example" 
                        defaultActiveKey={this.state.tabValue}
                        
                    > 
                        <Row  className="pt-2 ">
                            
                            <Col className="" md={3} >

                                <Nav variant="pills" className="flex-column sticky-menu">

                                    <Nav.Item >
                                        <Nav.Link eventKey="1" >
                                            <i className="fas fa-user text-secondary pr-2"></i>
                                            My Profile
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="2">
                                            <i className="fas fa-unlock-alt text-secondary pr-2"></i>
                                            Security
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="3">
                                            <i className="fas fa-users text-secondary pr-2"></i>
                                            People & sharing
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="4">
                                            <i className="far fa-comment-dots text-secondary pr-2"></i>
                                            Communication
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="5">
                                            <i className="fas fa-history text-secondary pr-2"></i>
                                            History
                                        </Nav.Link>
                                    </Nav.Item>

                                </Nav>

                            </Col>

                            <Col md={9}>
                                <Tab.Content className="" >

                                    <Tab.Pane eventKey="1">
                                        <ProfileCardForOwner 
                                            user={this.state.user}
                                            isEditable={isEditable}
                                            inEditMode={this.state.inEditMode}
                                            onClickEdit={this.onClickEdit}
                                            onClickCancel={this.onClickCancel}
                                            onClickSave={this.onClickSave}
                                            onChangeDisplayName={this.onChangeDisplayName}
                                            pendingUpdateCall={this.state.loggedInUser}
                                            entering={this.entering}

                                            // value of image
                                            loadedImage={this.state.image}
                                            // function for change image
                                            onFileSelect={this.onFileSelect}

                                            // error
                                            errors={this.state.errors}

                                            emailVerificationStatus={this.props.loggedInUser.emailVerificationStatus}

                                            // change pills
                                            changeTabValue={() => this.changeTabValue}
                                        />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="2">
                                        <Security />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="3">
                                        <PeopleAndSharing />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="4">
                                        <Communication />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="5">
                                        <div className="row">
                                            {this.state.userNotFound !== true && (
                                                <div className="col">
                                                    <HoaxFeed user={this.props.match.params.username} />
                                                </div>
                                            )}
                                        </div>
                                    </Tab.Pane>

                                </Tab.Content>
                        
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            )
        } 
        
        else {
            const isEditable = this.props.loggedInUser.username === this.props.match.params.username;
            pageContent = this.state.user && (

                <div className="container">
                    <div className="row">
                        <div data-testid="userpage">
                            <div className="col">
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
                                />
                            </div>
                        </div>

                        {this.state.userNotFound !== true && (
                            <div className="col">
                                
                                <HoaxFeed user={this.props.match.params.username} />
                            </div>
                        )}
                        
                    </div>
                </div>

            )

        };

        return (
            
            <div className="">

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