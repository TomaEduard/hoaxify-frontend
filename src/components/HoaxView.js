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

export class HoaxView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            image: '',

            id: this.props.hoax.id,
            favorite: this.props.hoax.userPreference.favorite,
            like: this.props.hoax.userPreference.like,
            bookmark: this.props.hoax.userPreference.bookmark,
        };
        // console.log(this.props);
    };

    // function for change favorite
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

    changeOpen = (imageValue) => {
        this.setState({ 
            image: imageValue,
            isOpen: !this.state.isOpen
        });
        console.log('image - ' + this.state.image)
        console.log('isOpen - ' + this.state.isOpen)
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
                                {displayName}
                                {/* {this.state.id}{displayName}@{username} */}
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
                                // title={<span><i className="fas fa-ellipsis-h text-secondary"></i> More</span>}
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

                <div className="row">
                    {/* <Heart
                        asd={this.state.id}
                        favorite={favorite}
                        changeFavorite={() => this.changeFavorite()}
                    /> */}

                    <div className="FavoriteHoax">
                        <FavoriteHoax
                            emailVerificationStatus={this.props.loggedInUser.emailVerificationStatus}
                            // emailVerificationStatus={false}
                            // emailVerificationStatus={false}
                            entering={this.entering}
                            favorite={this.state.favorite}
                            changeFavorite={this.changeFavorite}
                        />
                    </div>

             
                    {/* {!this.props.loggedInUser.emailVerificationStatus && (
                        <div className="btn btn-success">
                            Ca sa fie bine!
                        </div>
                    )} */}

                </div>

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