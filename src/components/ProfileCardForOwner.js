import React, { Component } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import InputProfileCard from './InputProfileCard';
import ButtonWithProgress from './ButtonWithProgress';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import personalInfo from '../assets/personalInfo.png';
import personalInfo2 from '../assets/personalInfo2.png';
import confirmationEmail from '../assets/confirmationEmail.png';
import ButtonPersonalInfo from './ButtonPersonalInfo';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from 'react-redux';
import Input from './Input';


class ProfileCardForOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };
// const ProfileCardForOwner = (props) => {
    render() {

        // console.log("UserPage -> ProfilCard: props.user.image:  " + props.user.image);

            const { displayName, username, image, emailVerificationStatus } = this.props.user;
            const showEditButton = this.props.isEditable && !this.props.inEditMode;
            
        return (
            <React.Fragment>
                <div className="card">
                    <Row>
                        <Col xs={12} md={12} xl={4}>
                            <div className="pt-3 pb-3 pl-2 text-center">
                                <ProfileImageWithDefault 
                                    alt="profile" 
                                    width="205" 
                                    height="205" 
                                    image={image}
                                    src={this.props.loadedImage}
                                    className="rounded-circle shadow-sm"
                                />   
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={5}>
                            <div className="card-body d-flex flex-column m-2 pl-4">
                                <Row className="pt-2 mb-0">
                                    <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold clickable-text"> 
                                    Fallowers
                                    </a>
                                    <p className="text-center text-login-page text-secondary notClickable-text">: &nbsp;number</p>
                                </Row>

                                <Row className="mb-0">
                                    <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold clickable-text"> 
                                    Fallowing
                                    </a>
                                    <p className="text-center text-login-page text-secondary notClickable-text">: &nbsp;number</p>
                                </Row>

                                <Row className="mb-0">
                                    <a href="http://localhost:3000/#/signup" className="text-secondary font-weight-bold clickable-text"> 
                                    Groups
                                    </a>
                                    <p className="text-center text-login-page text-secondary notClickable-text">: &nbsp;Not Implemented</p>
                                </Row>

                                <Row className="mb-0">
                                    <a className="text-secondary font-weight-bold clickable-text"> 
                                        {/* <button 
                                            className="btn btn-success "
                                            onClick={this.props.changeTabValue(5)}
                                        >
                                            Cancel
                                        </button> */}
                                    </a>
                                </Row>  

                                {/* <hr width="65%"></hr> */}

                                <Row>
                                    <div className="text-secondary clickable-text"> 
                                    Status:
                                    </div>
                                    <p className="text-success font-weight-bold success-text-resend notClickable-text">&nbsp;Activ</p>
                                </Row>
                                
                                <Row>
                                    <div className="text-secondary  clickable-text"> 
                                    Registration Data
                                    </div>
                                    <p className="text-center text-login-page text-secondary notClickable-text">: &nbsp;26/16/2020</p>
                                </Row> 

                                {emailVerificationStatus ? (
                                                                
                                    <Row>
                                        <div className="text-secondary lickable-text"> 
                                        Email Verification Status: 
                                        </div>
                                        <p className="text-success font-weight-bold success-text-resend notClickable-text">&nbsp;Confirmed</p>
                                    </Row>
                                ):( 
                                    <Row>
                                        <a href="http://localhost:3000/#/verification/confirmationEmail" className="text-secondary font-weight-bold clickable-text"> 
                                        Email Verification Status: 
                                        </a>
                                        <p className="text-danger font-weight-bold success-text-resend notClickable-text"> &nbsp;False</p>
                                    </Row>
                                )}


                            </div>
                        </Col>

                        <Col xs={12} md={6} lg={6} xl={3}>
                            <div className="d-flex justify-content-center personalInfo pr-5 "> 
                                <img className="" src={personalInfo} width="250" alt="Hoaxify" />
                            </div>
                            
                        </Col>
                    </Row>
                </div>


                <div className="card mt-4 p-2">
                    <Row>
                        <Col xs={12} md={8}>
                            <div className="card-body d-flex flex-column">
                                {!this.props.inEditMode && (
                                    // <h4>Displayname: {`${displayName}`} 
                                    // <br></br>
                                    // Email: {`${username}`} </h4>
                                    <div className="float-left pl-4">

                                        <Row className="">
                                            <div className="text-secondary font-weight-bold clickable-text"> 
                                                Display name:
                                            </div>
                                            <p className="text-login-page text-secondary notClickable-text">
                                                {/* &nbsp;{`${displayName}`} */}
                                            </p>
                                        </Row>
                                    
                                        <Row>
                                            <div className="text-secondary font-weight-bold">Email:</div>
                                            <p className="text-login-page text-secondary notClickable-text">
                                                {/* &nbsp;{`${username}`} */}
                                            </p>
                                        </Row>

                                        <Row>
                                            <div className="text-secondary font-weight-bold">Address:</div>
                                            <p className="text-login-page text-secondary notClickable-text">
                                                &nbsp;address
                                            </p>
                                        </Row>

                                        <Row>
                                            <div className="text-secondary font-weight-bold">Name:</div>
                                            <p className="text-login-page text-secondary notClickable-text">
                                                &nbsp;Test Name
                                            </p>
                                        </Row>
                                    </div>
                                )}

                                {this.props.inEditMode && (
                                    <div className="">

                                        <InputProfileCard
                                            value={displayName}
                                            // label={`Change Display Name for ${username}`}
                                            onChange={this.props.onChangeDisplayName}
                                            hasError={this.props.errors.displayName && true}
                                            error={this.props.errors.displayName}
                                        />
                                        
                                        <div className="mt-2">
                                            <Input 
                                                type="file" 
                                                onChange={this.props.onFileSelect}
                                                hasError={this.props.errors.image && true}
                                                error={this.props.errors.image}
                                            />
                                        </div>
                                    
                                    </div>
                                )}
                                
                                {this.props.inEditMode && (
                                    <div className="row m-1 pt-1">
                                        <div className="">
                                            <ButtonWithProgress 
                                                className="btn btn-outline-primary" 
                                                onClick={this.props.onClickSave}
                                                text={
                                                    <span>
                                                        <i className="far fa-save mr-2" />Save
                                                    </span>
                                                    }
                                                pendingApiCall={this.props.pendingUpdateCall}
                                                disabled={this.props.pendingUpdateCall}
                                            />
                                        </div>

                                        <button 
                                            className="btn btn-outline-secondary ml-auto" 
                                            onClick={this.props.onClickCancel}
                                            disabled={this.props.pendingUpdateCall}
                                        >
                                            <i className="fas fa-times mr-2 "></i>
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                <div className="mt-1 ml-auto">
                                    {showEditButton && (
                                        <button 
                                            className="btn btn-outline-primary"
                                            onClick={this.props.onClickEdit}
                                        >
                                            <i className="far fa-edit mr-2 "></i>
                                            Edit
                                        </button> 
                                    )}
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} md={4}>
                            <div className="d-flex justify-content-center personalInfo2 pr-5"> 
                                <img className="m-auto" src={personalInfo2} width="250" alt="Hoaxify" />
                            </div>
                        </Col>
                        
                    </Row>
                </div>

                <div className="card  mt-4 p-4">
                    <Row>
                        <Col xs={12} md={8} lg={9}>
                            <div className="card-body d-flex flex-column">
                                {/* {`${emailVerificationStatus}`} */}
                                {emailVerificationStatus ? (
                                                                
                                <h5 className="text-success font-weight-bold pt-3 text-center success-text-resend"> 
                                    <span className="far fa-check-circle fa-lg fa-2x"></span>
                                    <span className="">&nbsp;Your Email is Confirmed</span>
                                </h5>                            
                                ):( 
                                    <div>

                                        <h6 className="text-center text-login-page text-secondary notClickable-text"> 
                                            <span className="">Your e-mail is not confirmed yet, you can access
                                                the more button that will redirect you to a page where you will 
                                                find the necessary information to confirm.
                                            </span>
                                        </h6>

                                        <Link to="/verification/confirmationEmail" className="list-group-item-action">
                                            <div className="text-center pt-4">
                                                <ButtonPersonalInfo
                                                    onClick={false}
                                                    // disabled={disableSubmit || this.state.pendingApiCall}
                                                    disabled={false}
                                                    // pendingApiCall={this.state.pendingApiCall}
                                                    pendingApiCall={false}
                                                    value="Confirmation Page"
                                                />
                                                
                                            </div>  
                                        </Link>
                                    </div>
                                )}
                                

                            </div>
                        </Col>

                        <Col xs={12} md={4} lg={3}>
                            <div className="d-flex justify-content-center personalInfo2 pr-5"> 
                                <img className="m-auto" src={confirmationEmail} width="230" alt="Hoaxify" />
                            </div>
                        </Col>
                        
                    </Row>
                </div>

                <div className="row p-0 mt-1">
                    <DropdownButton
                        className=""
                        as={ButtonGroup}
                        key="Primary"
                        id="dropdown-button-drop-up"
                        drop="up"
                        variant="transparent"
                        title="English(United States)"
                    >
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton>{' '}

                    <p className="text-secondary pl-5 pt-3 text-login-card-buttom">Help</p>
                    <p className="text-secondary pl-5 pt-3 text-login-card-buttom">Privacy</p>

                </div>

            </React.Fragment>
        );
    }
};

ProfileCardForOwner.defaultProps = {
    errors: {}
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(ProfileCardForOwner); 