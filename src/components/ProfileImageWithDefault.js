import React from 'react';
import defaultPicture from '../assets/profile.png';
import { IMAGES_PROFILE } from '../config';

const ProfileImageWithDefault = (props) => {
    
    let imageSource = defaultPicture;
    if(props.image) {
        imageSource = `${IMAGES_PROFILE}/${props.image}`;
    }
    
    return (
        <img
            alt="alt-ProfileImageWithDefault"
            {...props}
            src={props.src || imageSource}
            // set default image if receive error
            onError={(event) => {
            event.target.src = defaultPicture;
            }}
        />
    );
};

export default ProfileImageWithDefault;