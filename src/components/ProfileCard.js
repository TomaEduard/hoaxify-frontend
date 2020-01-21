import React from 'react';
import defaultPicture from '../assets/profile.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

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
                </div>}

                {showEditButton && (
                    <button 
                        className="btn btn-outline-primary mt-2"
                        onClick={props.onClickEdit}
                    >
                    <i className="far fa-edit mr-2"></i>
                    Edit
                </button>)}
                {props.inEditMode && (
                    <React.Fragment>
                        <div className="pull-right mt-2 mr-2">
                            <ButtonWithProgress 
                                className="btn btn-outline-primary btn-sm mt-2 " 
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
                            className="btn btn-outline-secondary btn-sm mt-2 mr-2 pull-right" 
                            onClick={props.onClickCancel}
                            disabled={props.pendingUpdateCall}
                        >
                            <i className="fas fa-times mr-2 "></i>
                            Cancel
                        </button>
                    </React.Fragment>
                    
                )}
            </div>
        </div>
    );
};

export default ProfileCard;