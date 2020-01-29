import React, { Component } from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { connect } from 'react-redux';
import NeedToBeAuthenticated from '../components/NeedToBeAuthenticated';
import Fallow from '../components/Fallow';
import Favorite from '../components/Favorite';
import Bookmarks from '../components/Bookmarks';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
// import Sonnet from 'react-bootstrap/Sonnet';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';


class HomePage extends Component {
    state = { 
    }


    render() { 

        return (
                
            <div className="container pt-2">
                <div data-testid="homepage">Homepage

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row  className="pt-2">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">
                                        <i className="fas fa-home text-secondary pr-2"></i>
                                        Home
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">
                                        <i className="fas fa-user-plus text-secondary pr-2"></i>
                                        Fallow
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">
                                        <i className="fas fa-heart text-secondary pr-2"></i>
                                        Favorites
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">
                                        <i className="fas fa-bookmark text-secondary pr-2"></i>
                                        Bookmarks
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth">
                                    <i className="fas fa-users text-secondary pr-2"></i>
                                        Explor
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="sixth">
                                        <i className="fas fa-user text-secondary pr-2"></i>
                                        Profile
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>

                        <Col sm={9}>
                            <Tab.Content>
                                
                                {/* Home */}
                                <Tab.Pane eventKey="first">
                                    {this.props.loggedInUser.isLoggedIn && <HoaxSubmit />}
                                    {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                </Tab.Pane>

                                {/* Fallow */}
                                <Tab.Pane eventKey="second">
                                    {this.props.loggedInUser.isLoggedIn && <Fallow />}
                                    {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                </Tab.Pane>

                                {/* Favorites */}
                                <Tab.Pane eventKey="third">
                                    {this.props.loggedInUser.isLoggedIn && <Favorite />}
                                    {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                </Tab.Pane>

                                {/* Bookmarks */}
                                <Tab.Pane eventKey="fourth">
                                    {this.props.loggedInUser.isLoggedIn && <Bookmarks/>}
                                    {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                </Tab.Pane>

                                {/* Explor */}
                                <Tab.Pane eventKey="fifth">
                                    <UserList />
                                </Tab.Pane>

                                {/* Profile */}
                                <Tab.Pane eventKey="sixth">

                                </Tab.Pane>

           

                            </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>

                    {/* <div className="row">

                        <div className="col-8">
                            {this.props.loggedInUser.isLoggedIn && <HoaxSubmit />}
                            {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                        </div>

                        <div className="col-4">
                            <UserList />
                        </div>
                        
                    </div> */}

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

export default connect(mapStateToProps)(HomePage);