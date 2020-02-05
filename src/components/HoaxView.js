import React, { Component } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

// Lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HoaxFeed from '../components/HoaxFeed';


export class HoaxView extends Component {
    
    state = {
        isOpen: false,
        image: '',
    };

    // changeOpen = (imageValue) => {
    // this.setState({ 
    //     image: imageValue,
    //     isOpen: !this.state.isOpen
    // });
    // console.log('image - ' + this.state.image)
    // console.log('isOpen - ' + this.state.isOpen)
    // };

    changeOpen = (imageValue) => {
        this.setState({ 
            image: imageValue,
            isOpen: !this.state.isOpen
        });
        console.log('image - ' + this.state.image)
        console.log('isOpen - ' + this.state.isOpen)
    };

    render() {
        const { hoax, onClickDelete } = this.props;
        const { user, date } = hoax;
        const { username, displayName, image } = user;
        const relativeDate = format(date);
        const attachmentImageVisible = hoax.attachment && hoax.attachment.fileType.startsWith('image');
        // const attachmentImageVisible = hoax.attachment && hoax.attachment.fileType.startsWith('image');
        
        // verify for show arrow button
        const ownedByLoggedInUser = user.id === this.props.loggedInUser.id;

        return (
            

            <div className="card p-1">

                {this.state.isOpen && (
                    <Lightbox 
                        // mainSrc={image[0]}
                        mainSrc={`/images/attachments/${hoax.attachment.name}`}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            
                <div className="d-flex">
                    <ProfileImageWithDefault
                        className="rounded-circle m-1"
                        width="32"
                        height="32"
                        image={image}
                    />
                    <div className="flex-fill m-auto pl-2">
                        <Link to={`/${username}`} className="list-group-item-action">
                            <h6 className="d-inline">
                                {displayName}@{username}
                            </h6>

                        </Link>
                        <span className="text-black-50"></span>
                        {/* <br /> */}
                        <span>  -  </span>
                        <span className="text-black-50">{relativeDate}</span>
                    </div>
                    
                        {ownedByLoggedInUser && (
                            <DropdownButton
                                key=""
                                variant=""
                                // id="dropdown-button-drop-up"
                                id="dropdown-menu-align-left"
                                drop="down"
                                // title="More"
                                // title={<span><i className="fas fa-ellipsis-h text-secondary"></i> More</span>}
                                title=""
                            >
                                    
                                <div className="shadow text-more">
                                                                            
                                    <Dropdown.Item eventKey="1" disabled={true}>
                                        <i className="fas fa-ban text-secondary pr-2" ></i>
                                        Block (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="2" disabled={true}>
                                        <i className="far fa-flag text-secondary pr-2"></i>
                                        Report (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item 
                                        eventKey="3" 
                                        onClick={onClickDelete} 
                                    >
                                        <i className="far fa-trash-alt text-secondary pr-2"></i>
                                        Delete Post
                                    </Dropdown.Item>                                
                                    
                                    <Dropdown.Item eventKey="3">
                                        <i className="far fa-edit text-secondary pr-2"></i>
                                        Edit Post
                                    </Dropdown.Item>
                        

                                    <Dropdown.Divider />
                                    
                                </div>
                            </DropdownButton>
                        )}

                        {!ownedByLoggedInUser && (
                            <DropdownButton
                                key=""
                                variant=""
                                // id="dropdown-button-drop-up"
                                id="dropdown-menu-align-left"
                                drop="left"
                                // title="More"
                                // title={<span><i className="fas fa-ellipsis-h text-secondary"></i> More</span>}
                                title=""
                            >
                                    
                                <div className="shadow text-more">
                                                                            
                                    <Dropdown.Item eventKey="1" disabled={true}>
                                        <i className="fas fa-ban text-secondary pr-2" ></i>
                                        Block (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="2" disabled={true}>
                                        <i className="far fa-flag text-secondary pr-2"></i>
                                        Report (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                </div>
                            </DropdownButton>
                        )}      

                    {/* <button> Delete </button> */}

                    <div className="">
                        {/* <ButtonToolbar>
                            <Button variant="outline-warning">Warning</Button>
                        </ButtonToolbar> */}
                    </div>
                </div>

                <div className="pl-5">
                    {hoax.content}  
                </div>                
                {attachmentImageVisible && (
                    <div className="pl-5 img-max">
                        <img 
                            alt="attachment"
                            src={`/images/attachments/${hoax.attachment.name}`}
                            className="img-fluid"
                            onClick={() => this.changeOpen(hoax.attachment.name)}
                            
                        />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateProps)(HoaxView);