import React, { Component } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as apiCalls from '../api/apiCalls';

// Lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FavoriteHoax from '../components/preferences/favoriteHoax/FavoriteHoax';
import LikeHoax from '../components/preferences/likeHoax/LikeHoax';
import BookmarkHoax from '../components/preferences/bookmarkHoax/BookmarkHoax';
import Row from 'react-bootstrap/Row';

export class HoaxView extends Component {
    constructor(props) {
        super(props);
        // console.log("HoaxView =>",this.props);
        this.state = {
            isOpen: false,
            isOpenProfile: false,
            image: '',
            id: this.props.hoax.id,
            favorite: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.favorite : false),
            like: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.like : false),
            bookmark: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.bookmark : false),
        };
    };

    changeFavorite = () => {

        this.setState({
            favorite: !this.state.favorite,
            },
        
            function() { 
                var body = ({
                    "favorite": this.state.favorite,
                    "like": this.state.like,
                    "bookmark": this.state.bookmark
                })
            
                apiCalls.setPreference(this.state.id , body);
                // no need .then .catch at the moment
            }
        );
    }

    changeLike = () => {

        this.setState({
            like: !this.state.like,
            },

            function() { 
                var body = ({
                    "favorite": this.state.favorite,
                    "like": this.state.like,
                    "bookmark": this.state.bookmark
                })
            
                apiCalls.setPreference(this.state.id , body);
                // no need .then .catch at the moment

            }
        );
    }

    changeBookmark = () => {

        this.setState({
            bookmark: !this.state.bookmark,
            },

            function() { 
                var body = ({
                    "favorite": this.state.favorite,
                    "like": this.state.like,
                    "bookmark": this.state.bookmark
                })
            
                apiCalls.setPreference(this.state.id , body);
                // no need .then .catch at the moment

            }
        );
    }

    changeOpen = (imageValue) => {
        this.setState({ 
            image: imageValue,
            isOpen: !this.state.isOpen
        });
        console.log('image - ' + this.state.image)
        console.log('isOpen - ' + this.state.isOpen)
    };

    changeOpenProfileImage = (imageValue) => {
        this.setState({ 
            image: imageValue,
            isOpenProfile: !this.state.isOpenProfile
        });
        console.log('image - ' + this.state.image)
        console.log('isOpenProfile - ' + this.state.isOpenProfile)
    };

    // Set your color here
    entering = (e) => {
        // e.children[0].style.borderTopColor = 'green';
        e.children[1].style.backgroundColor = 'rgba(0,0,0,0.7)';
    };

    render() {
        const { hoax, onClickDelete } = this.props;
        const { user, date } = hoax;
        const { username, displayName, image } = user;
        const relativeDate = format(date);
        
        const attachmentImageVisible = hoax.attachment && hoax.attachment.fileType.startsWith('image');
        
        // verify for show arrow button
        const ownedByLoggedInUser = user.id === this.props.loggedInUser.id;
        // const emailVerificationStatus = this.props.loggedInUser.emailVerificationStatus;
        let emailVerificationStatus = this.props.loggedInUser.emailVerificationStatus;

        let imageProfile = 'profile.png';
        if(image !== 'profile.png') {
            imageProfile = image
        }

        {/* (this.props.location.tabValue !== undefined ? this.props.location.tabValue : 1), */}


        return (
            <div className="card-home p-1">
                {this.state.isOpen && (
                    <Lightbox 
                        // mainSrc={image[0]}
                        mainSrc={`/images/attachments/${hoax.attachment.name}`}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}                
                {this.state.isOpenProfile && (
                    
                    <Lightbox 
                    // let profileImage = {`${image}`}
                        // mainSrc={image[0]}
                        mainSrc={`/images/profile/${imageProfile}`}
                        // mainSrc={`/images/profile/${image}`}
                        // mainSrc='/images/profile/profile.png'
                        onCloseRequest={() => this.setState({ isOpenProfile: false })}
                    />
                )}

            {/* (this.props.location.tabValue !== undefined ? this.props.location.tabValue : 1), */}
                <div className="d-flex">
                    <ProfileImageWithDefault
                        className="rounded-circle m-1"
                        width="48"
                        height="48"
                        image={image}
                        onClick={() => this.changeOpenProfileImage(image)}
                    />

                        <div className="flex-fill m-auto pl-2">

                            {/* style={{ textDecoration: 'none' }} */}
                            <Link to={`/${username}`} className="list-group-item-action">
                                <h6 className="d-inline">
                                    {displayName}
                                    {/* {this.state.id}{displayName}@{username} */}
                                </h6>
                            </Link>
                            {/* <span className="text-black-50"></span> */}

                            <button className="btn btn-outline-dark btn-sm ml-2 fallowButton">
                                <span className="fallowButtonText">Follow</span>
                            </button>    
                            
                            <br></br>

                            <span className="text-black-50 pt-1 relativeDate-HoaxView">{relativeDate}</span>

                        </div>
{/* 
                    <br></br>
                    <hr></hr> */}

                        {ownedByLoggedInUser && (
                            <DropdownButton
                                key=""
                                variant=""
                                id="dropdown-menu-align-left"
                                drop="down"
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

                                    <Dropdown.Item eventKey="3" disabled={true}>
                                        <i className="far fa-eye-slash text-secondary pr-2"></i>
                                        Hide Post (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="3" disabled={true}>
                                        <i className="fas fa-code text-secondary pr-2"></i>
                                        embed (Not implemented)
                                    </Dropdown.Item>
                                    <Dropdown.Divider />

                                    <Dropdown.Item 
                                        eventKey="3" 
                                        onClick={onClickDelete} 
                                    >
                                        <i className="far fa-trash-alt text-secondary pr-2"></i>
                                        Delete Post
                                    </Dropdown.Item>                                
                                    
                                    <Dropdown.Item eventKey="3" disabled={true}>
                                        <i className="far fa-edit text-secondary pr-2"></i>
                                        Edit Post (Not implemented)
                                    </Dropdown.Item>
                        

                                    {/* <Dropdown.Divider /> */}
                                    
                                </div>
                            </DropdownButton>
                        )}

                        {!ownedByLoggedInUser && (
                            <DropdownButton
                                key=""
                                variant=""
                                id="dropdown-menu-align-left"
                                drop="down"
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

                                    <Dropdown.Item eventKey="3" disabled={true}>
                                        <i className="far fa-eye-slash text-secondary pr-2"></i>
                                        Hide Post (Not implemented)
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey="3" disabled={true}>
                                        <i className="fas fa-code text-secondary pr-2"></i>
                                        embed (Not implemented)
                                    </Dropdown.Item>
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

                <div className="pl-5 pt-3">
                    {hoax.content}  
                </div>                

                {attachmentImageVisible && (
                    <div className="m-auto pt-3 img-max"> 
                        <img 
                            alt="attachment"
                            src={`/images/attachments/${hoax.attachment.name}`}
                            className="img-fluid"
                            onClick={() => this.changeOpen(hoax.attachment.name)}
                        />
                    </div>
                )}

                <div className="m-2 pl-4 mt-4">
                    <div className="row">
                        <div className="containerPreferences pr-3 ml-auto">

                            <FavoriteHoax
                                emailVerificationStatus={this.props.loggedInUser.emailVerificationStatus}
                                // emailVerificationStatus={false}
                                // emailVerificationStatus={false}
                                entering={this.entering}
                                favorite={this.state.favorite}
                                changeFavorite={this.changeFavorite}
                            />
                        </div>

                        <div className="bookmarkPreference">
                            <BookmarkHoax
                                emailVerificationStatus={this.props.loggedInUser.emailVerificationStatus}
                                // emailVerificationStatus={false}
                                // emailVerificationStatus={false}
                                entering={this.entering}
                                bookmark={this.state.bookmark}
                                changeBookmark={this.changeBookmark}
                            />
                        </div>

                        <div className="likePreference pr-4">
                            <LikeHoax
                                emailVerificationStatus={this.props.loggedInUser.emailVerificationStatus}
                                // emailVerificationStatus={false}
                                // emailVerificationStatus={false}
                                entering={this.entering}
                                like={this.state.like}
                                changeLike={this.changeLike}
                            />
                        </div>
                        
                        <i className="fas fa-link sharePreference"></i>

                        <div className="">
                            <button className="btn btn-primary-outline btn-sm mr-4">
                                <i className="fas fa-reply-all text-secondary pr-2"></i>
                                <span className="replyPreference">Reply</span>
                            </button>
                        </div>

                    </div>
                </div>
                <hr width="100%"></hr>

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