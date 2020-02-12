import React, { Component } from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { connect } from 'react-redux';
import NeedToBeAuthenticated from '../components/NeedToBeAuthenticated';
import Fallow from '../components/Fallow';
import Favorite from '../components/Favorite';
import Bookmarks from '../components/Bookmarks';
import Like from '../components/Like';
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
import UserPage from './UserPage';

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
                <div data-testid="homepage">Homepage

                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row  className="pt-2 ">
                            
                            <Col className="" sm={3} >

                                <Nav variant="pills" className="flex-column sticky-menu">
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
                                            <i className="fas fa-thumbs-up text-secondary pr-2"></i>
                                            Like
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="fifth">
                                            <i className="fas fa-bookmark text-secondary pr-2"></i>
                                            Bookmarks
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="sixth">
                                            <i className="fas fa-users text-secondary pr-2"></i>
                                            Explor
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="seventh">
                                            <i className="fas fa-sliders-h text-secondary pr-2"></i>
                                            Prefferences
                                        </Nav.Link>
                                    </Nav.Item>

                                    <hr width="70%"></hr>

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
                                                                tabValue: '1',
                                                            }}
                                                                style={{ textDecoration: 'none' }}

                                                            >
                                                                <i className="fas fa-cogs text-secondary pr-2"></i>
                                                                Settings
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
                                                            Log out
                                                            
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
                                    {/* Home */}
                                    <Tab.Pane eventKey="first">
                                            
                                        {this.props.loggedInUser.isLoggedIn && [
                                            
                                            // TODO: add map of this component
                                            <HoaxSubmit
                                            
                                            />,
                                            <HoaxFeed />
                                        ]}
                                        
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

                                    {/* Like */}
                                    <Tab.Pane eventKey="fourth">
                                        {this.props.loggedInUser.isLoggedIn && <Like />}
                                        {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                    </Tab.Pane>

                                    {/* Bookmarks */}
                                    <Tab.Pane eventKey="fifth">
                                        {this.props.loggedInUser.isLoggedIn && <Bookmarks/>}
                                        {!this.props.loggedInUser.isLoggedIn && <NeedToBeAuthenticated />}
                                    </Tab.Pane>

                                    {/* Explor */}
                                    <Tab.Pane eventKey="sixth">
                                        <UserList />
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