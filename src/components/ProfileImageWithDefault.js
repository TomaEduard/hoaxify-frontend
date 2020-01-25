import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
    let imageSource = defaultPicture;
    if(props.image) {
        imageSource = `/images/profile/${props.image}`;
    }
    
    return (
        <img
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