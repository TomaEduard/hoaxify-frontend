import React from 'react';
import defaultPicture from '../assets/profile.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

import { Button } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const ProfileCard = (props) => {
    const { displayName, username, image } = props.user;

    const showEditButton = props.isEditable && !props.inEditMode;

    return (
        <div className="card">

            <div className="card-header text-center">
                <ProfileImageWithDefault 
                    alt="profile" 
                    width="200" 
                    height="200" 
                    image={image}
                    src={props.loadedImage}
                    className="rounded-circle shadow"
                />   
            </div>

            <div className="card-body text-center">
                {!props.inEditMode && <h4>{`${displayName}@${username}`}</h4>}

                {props.inEditMode && <div className="mb-2">

                    <Input
                        value={displayName}
                        label={`Change Display Name for ${username}`}
                        onChange={props.onChangeDisplayName}

                    />

                    <input className="form-control-file mt-2" type="file" 
                        onChange={props.onFileSelect}
                    />
                    
                </div>}

                {showEditButton && (

                    <OverlayTrigger
                        key={'bottom'}
                        placement={'bottom'}
                        // overlay={this.tooltip} 
                        onEntering={props.entering}
                        overlay={
                            <Tooltip 
                            id="tooltip-bottom" 
                            >
                                Ma lingi in cotor caline.
                            </Tooltip>
                        }
                    >

                        <button 
                            className="btn btn-outline-primary mt-2"
                            onClick={props.onClickEdit}
                        >
                            
                            <i className="far fa-edit mr-2"></i>
                            Edit
                        </button> 
                    </OverlayTrigger>)
                    
                }
                
                {props.inEditMode && (
                    <div className="pt-2 row m-1">
                        <div className="">
                            <ButtonWithProgress 
                                className="btn btn-outline-primary" 
                                onClick={props.onClickSave}
                                text={
                                    <span>
                                        <i className="far fa-save mr-2" />Save
                                    </span>
                                    }
                                pendingApiCall={props.pendingUpdateCall}
                                disabled={props.pendingUpdateCall}
                            />
                        </div>

                        <button 
                            className="btn btn-outline-secondary ml-auto" 
                            onClick={props.onClickCancel}
                            disabled={props.pendingUpdateCall}
                        >
                            <i className="fas fa-times mr-2 "></i>
                            Cancel
                        </button>
                    </div>
                    
                )}
            </div>
            
        </div>
    );
};

export default ProfileCard;