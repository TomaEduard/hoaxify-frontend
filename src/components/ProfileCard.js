import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import InputProfileCard from './InputProfileCard';
import ButtonWithProgress from './ButtonWithProgress';

import { Button } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Input from './Input';

const ProfileCard = (props) => {
    const { displayName, username, image } = props.user;

    const showEditButton = props.isEditable && !props.inEditMode;
    // console.log("UserPage -> ProfilCard: props.user.image:  " + props.user.image);
    
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

                {props.inEditMode && (
                    <div className="mb-2">

                        <InputProfileCard
                            value={displayName}
                            label={`Change Display Name for ${username}`}
                            onChange={props.onChangeDisplayName}
                            hasError={props.errors.displayName && true}
                            error={props.errors.displayName}
                        />
                        
                        <div className="mt-2">
                            <Input 
                                type="file" 
                                onChange={props.onFileSelect}
                                hasError={props.errors.image && true}
                                error={props.errors.image}
                            />
                        </div>
                    
                    </div>
                )}

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
                                Tooltip
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

ProfileCard.defaultProps = {
    errors: {}
}

export default ProfileCard;