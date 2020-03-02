import React, { Component } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as apiCalls from '../api/apiCalls';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// link and videos of hoax 
import Linkify from 'react-linkify';
import ReactPlayer from 'react-player'

import { 
    API_URL, 
    IMAGES_ATTACHMENTS,
    IMAGES_PROFILE,

} from '../config';
// import Row from 'react-bootstrap/Row';

// Lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// preferences
import FollowUser from '../components/preferences/followUser/FollowUser';
import FavoriteHoax from '../components/preferences/favoriteHoax/FavoriteHoax';
import LikeHoax from '../components/preferences/likeHoax/LikeHoax';
import BookmarkHoax from '../components/preferences/bookmarkHoax/BookmarkHoax';

export class HoaxView extends Component {
    constructor(props) {
        super(props);
        // console.log("HoaxView =>",this.props);
        this.state = {
            isOpen: false,
            isOpenProfile: false,
            image: '',
            id: this.props.hoax.id,
            follow: false,
            favorite: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.favorite : false),
            like: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.like : false),
            bookmark: (this.props.hoax.userPreference !== null ? this.props.hoax.userPreference.bookmark : false),
        };
    };

    changeFollow = () => {

        this.setState({
            follow: !this.state.follow,
            },
        
            function() { 
                const body = ({
                    "follow": this.state.follow,
                    "favorite": this.state.favorite,
                    "like": this.state.like,
                    "bookmark": this.state.bookmark
                })
            
                apiCalls.setPreference(this.state.id , body);
                // no need .then .catch at the moment
            }
        );
    }

    changeFavorite = () => {

        this.setState({
            favorite: !this.state.favorite,
            },
        
            function() { 
                const body = ({
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
                const body = ({
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
                const body = ({
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
        // let emailVerificationStatus = this.props.loggedInUser.emailVerificationStatus;

        let imageProfile = 'profile.png';
        if(image !== 'profile.png') {
            imageProfile = image
        }
        // {/* (this.props.location.tabValue !== undefined ? this.props.location.tabValue : 1), }

        const hoaxContent = hoax.content;

        // console.log('#1 hoax.content - ', hoaxContent);
        var ifHoaxContainContainYouTubeVideo = hoaxContent.includes("youtube.com/watch");
        var ifHoaxContainContainSoundCloudVideo = hoaxContent.includes("soundcloud.com/");
        var ifHoaxContainContainMixCloudVideo = hoaxContent.includes("mixcloud.com/");
        var ifHoaxContainContainTwitchVideo = hoaxContent.includes("twitch.tv/");
        // var ifHoaxContainContainFacebookVideo = hoaxContent.includes("/videos/");

        // console.log('#2 if hoax.content.includes YouTube - ', ifHoaxContainContainYouTubeVideo);
        // console.log('#2 if hoax.content.includes SoundCloud - ', ifHoaxContainContainYouTubeVideo);
        // console.log('#2 if hoax.content.includes MixCloud - ', ifHoaxContainContainMixCloudVideo);
        // console.log('#2 if hoax.content.includes Twitch - ', ifHoaxContainContainTwitchVideo);
        // console.log('#2 if hoax.content.includes Facebook - ', ifHoaxContainContainFacebookVideo);

        return (
            <div className="card-home p-1">
                {this.state.isOpen && (
                    <Lightbox 
                        // mainSrc={image[0]}
                        // mainSrc={`http://HoaxifyApp-env.eq9spv9gbn.eu-west-3.elasticbeanstalk.com/images/attachments/${hoax.attachment.name}`}
                        mainSrc={`${IMAGES_ATTACHMENTS}/${hoax.attachment.name}`}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}                
                {this.state.isOpenProfile && (
                    
                    <Lightbox 
                        mainSrc={`${IMAGES_PROFILE}/${imageProfile}`}
                        onCloseRequest={() => this.setState({ isOpenProfile: false })}
                    />
                )}

                <div className="d-flex">
                    <ProfileImageWithDefault
                        className="rounded-circle m-1"
                        width="52"
                        height="52"
                        image={image}
                        onClick={() => this.changeOpenProfileImage(image)}
                    />

                        <div className="flex-fill m-auto pl-2">
                        
                            <Link to={`/${username}`} className="list-group-item-action">
                                <h6 className="d-inline displayNameHoaxView">
                                    {displayName}
                                </h6>
                            </Link>

                            <FollowUser
                                emailVerificationStatus={false}
                                entering={this.entering}
                                // follow={this.state.follow}
                                follow={false}
                                changeFollow={this.changeFollow}
                            />
                            
                            <br></br>

                            <span className="text-black-50 pt-1 relativeDate-HoaxView">{relativeDate}</span>

                        </div>
                        
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
             
                <Linkify>
                    <div className="pl-5 pt-3" style={{ whiteSpace: 'pre-wrap' }}>
                        {hoax.content}
                        
                        {/* Not work if comming with message */}
                        {/* {ifHoaxContainContainFacebookVideo && (
                            <div className='mix-cloud mt-4'>
                                <ReactPlayer 
                                    // className='react-player'
                                    url={hoax.content}
                                    width='100%'
                                    height='100%'
                                    // playing
                                />
                            </div>
                        )} */}

                        {ifHoaxContainContainSoundCloudVideo && (
                            <div className='player-wrapper mt-3'>
                                <ReactPlayer 
                                    className='react-player'
                                    url={hoax.content}
                                    // width='100%'
                                    // height='40vh'
                                    width='100%'
                                    height='100%'
                                    // playing
                                />
                            </div>
                        )}

                        {ifHoaxContainContainYouTubeVideo && (
                            <div className='player-wrapper mt-3'>
                                <ReactPlayer 
                                    className='react-player'
                                    url={hoax.content}
                                    // width='100%'
                                    // height='40vh'
                                    width='100%'
                                    height='100%'
                                    // playing
                                />
                            </div>
                        )}

                        {ifHoaxContainContainMixCloudVideo && (
                            <div className='mix-cloud mt-4'>
                                <ReactPlayer 
                                    // className='react-player'
                                    url={hoax.content}
                                    width='100%'
                                    height='100%'
                                    // playing
                                />
                            </div>
                        )}

                        {ifHoaxContainContainTwitchVideo && (
                            <div className='player-wrapper mt-3'>
                                <ReactPlayer 
                                    className='react-player'
                                    url={hoax.content}
                                    // width='100%'
                                    // height='40vh'
                                    width='100%'
                                    height='100%'
                                    // playing
                                />
                            </div>
                        )}

                      

                    </div>
                </Linkify>


                {attachmentImageVisible && (
                    <div className="m-auto pt-3 img-max"> 
                        <img 
                            alt="attachment"
                            src={`${IMAGES_ATTACHMENTS}/${hoax.attachment.name}`}
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