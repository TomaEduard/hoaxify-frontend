import React from 'react';
import defaultPicture from '../assets/profile.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';


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
                {
                    props.inEditMode && (
                        <React.Fragment>
                            <button className="btn btn-outline-primary mt-2 pull-left">
                                <i className="far fa-save mr-2"></i>
                                Save
                            </button>
                            <button className="btn btn-outline-secondary mt-2 pull-right" onClick={props.onClickCancel}>
                                <i className="fas fa-times mr-2 "></i>
                                Cancel
                            </button>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    );
};

export default ProfileCard;