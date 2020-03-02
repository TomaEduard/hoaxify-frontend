import React, { Component } from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { connect } from 'react-redux';
import NeedToBeAuthenticated from '../components/NeedToBeAuthenticated';

// import Fallow from '../components/Fallow';
// import Favorite from '../components/Favorite';
// import Bookmarks from '../components/Bookmarks';

import Preferences from '../components/Preferences';
import FeedPage from '../assets/FeedPage.png';
import preferences from '../assets/preferences.png';
import Explor from '../assets/Explor.png';
import MyProfile from '../assets/myProfile.png';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
// import Sonnet from 'react-bootstrap/Sonnet';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from '../components/ProfileImageWithDefault';
import HoaxFeed from '../components/HoaxFeed';

class HomePage extends Component {
    state = { 
    }

    onClickLogout = () => {
        const action = {
            type: 'logout-success'
        };
        
        this.props.dispatch(action);
    };

    render() { 

        return (
                
            <div className="container pt-2">
                <div data-testid="homepage">

                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row  className="pt-2 ">
                            
                            <Col className="" sm={3}>

                                <Nav variant="pills" className="flex-column sticky-menu">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">
                                            {/* <i className="fas fa-home text-secondary pr-2"></i> */}
                                            <img src={FeedPage} width="40" alt="FeedPage" />
                                            <span className="pl-2">Feed Page</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            {/* <i className="fas fa-user-plus text-secondary pr-2"></i> */}
                                            <img src={preferences} width="40" alt="Preferences" />
                                            <span className="pl-2">Preferences</span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="third">
                                            {/* <i className="fas fa-heart text-secondary pr-2"></i> */}
                                            <img src={Explor} width="40" alt="Explor" />
                                            <span className="pl-2">Explor</span>
                                        </Nav.Link>
                                    </Nav.Item>
                           
                                    <hr width="93%"></hr>
                                    
                                    {/* <img src={logo} width="100" alt="Hoaxify" /> */}
                                    {/* <img src={logo} width="150" alt="Hoaxify" /> */}

                                    <Link to= {{
                                        pathname:`/${this.props.loggedInUser.username}`,
                                        tabValue: '1',
                                    }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <img src={MyProfile} width="40" alt="Explor" />
                                        <span className="pl-2">My Profile</span>
                                    </Link>

                                    <div className="">
                                        {this.props.loggedInUser.isLoggedIn && (
                                            <div className="ml-2 pb-2">
                                                
                                                {/* <span><i className="fas fa-ellipsis-h text-secondary icon-more"></i></span> */}
                                                <DropdownButton
                                                    key=""
                                                    variant=""
                                                    // id="dropdown-button-drop-up"
                                                    id="dropdown-menu-align-right"
                                                    drop="right"
                                                    // title="More"
                                                    title={<span><i className="fas fa-ellipsis-h text-secondary"></i> More</span>}
                                                >
                                                    <div className="shadow text-more">
                                                        <Dropdown.Item eventKey="1">
                                                            
                                                            <Link to={`/${this.props.loggedInUser.username}`} className="nav-link">
                                                                <div className="row">

                                                                    <ProfileImageWithDefault
                                                                        className="rounded-circle "
                                                                        width="32"
                                                                        height="32"
                                                                        image={this.props.loggedInUser.image}
                                                                    />

                                                                    <div className="pl-2 mt-1 text-dark">
                                                                        {this.props.loggedInUser.displayName}
                                                                    </div>
                                                                
                                                                </div>
                                                            </Link>
                                                    
                                                        </Dropdown.Item>
                                                    
                                                        <Dropdown.Item eventKey="1" disabled={true}>
                                                            <i className="fas fa-plus text-secondary pr-2"></i>
                                                            Action
                                                        </Dropdown.Item>

                                                        <Dropdown.Item eventKey="2" disabled={true}>
                                                            <i className="fas fa-plus text-secondary pr-2"></i>
                                                            Another action
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="3" disabled={true}>
                                                            <i className="fas fa-plus text-secondary pr-2"></i>
                                                            Another action
                                                        </Dropdown.Item>

                                                        <Dropdown.Divider />

                                                        <Dropdown.Item eventKey="4">   
                                                            <Link to= {{
                                                                pathname:`/${this.props.loggedInUser.username}`,
                                                                tabValue: '2',
                                                            }}
                                                                style={{ textDecoration: 'none' }}

                                                            >
                                                                <i className="fas fa-cogs text-secondary pr-2"></i>
                                                                Security
                                                            </Link>
                                                        </Dropdown.Item>
                                                        
                                                        <Dropdown.Item eventKey="5" disabled={true}>
                                                            <i className="fas fa-info-circle text-secondary pr-2"></i>
                                                            Help Center
                                                        </Dropdown.Item>

                                                        <Dropdown.Divider />

                                                        <Dropdown.Item eventKey="6"
                                                        onClick={this.onClickLogout}
                                                        >
                                                            <i className="fas fa-sign-out-alt text-secondary pr-2"></i>
                                                            Logout
                                                            
                                                        </Dropdown.Item>
                                                        
                                                    </div>
                                                </DropdownButton>                         
                                            </div>
                                        )}

                                        {!this.props.loggedInUser.isLoggedIn && (
                                            <div className="ml-2 pb-2">
                                                <DropdownButton
                                                    disabled={true}
                                                    key=""
                                                    variant=""
                                                    id="dropdown-menu-align-right"
                                                    drop="right"
                                                    title={<span><i className="fas fa-ellipsis-h text-secondary"></i> More</span>}>
                                                </DropdownButton>                         
                                            </div>
                                        )}
                                    </div>
                                </Nav>


                            </Col>

                            <Col sm={9}>
                                <Tab.Content className="">

                                    {/* Feed Page */}
                                    <Tab.Pane eventKey="first">
                                        <HoaxSubmit/>
                                        <HoaxFeed />

                                        {/* Need to be authenticate to see thhis content */}
                                        {/* {this.props.loggedInUser.isLoggedIn && [
                                            // TODO: add map for this component
                                            <HoaxSubmit
                                            />,
                                            <HoaxFeed />
                                        ]} */}
                                        
                                        {/* {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />} */}
                                    </Tab.Pane>

                                    {/* Preferences */}
                                    <Tab.Pane eventKey="second">
                                        {this.props.loggedInUser.isLoggedIn && <Preferences />}
                                        {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                    </Tab.Pane>

                                    {/* Explor */}
                                    <Tab.Pane eventKey="third">
                                        <UserList />
                                    </Tab.Pane>

                                    <Link to ="/" className="navbar-brand">
                                        <Tab.Pane eventKey="forth">
                                        </Tab.Pane>
                                    </Link>

                                </Tab.Content>
                        
                            </Col>
                        </Row>
                    </Tab.Container>

                   
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