import React from 'react';
import defaultPicture from '../assets/profile.png';
import { IMAGES_PROFILE } from '../config';

const ProfileImageWithDefault = (props) => {
    let imageSource = defaultPicture;

    const imageContent = props.image;

    if (imageContent != null) {
        let ifImageContainFacebookURL = imageContent.includes("https://");

        if(ifImageContainFacebookURL) {
            imageSource = `${props.image}`;
        } else if (props.image) {
            imageSource = `${IMAGES_PROFILE}/${props.image}`;
        }
    }


    return (

        <React.Fragment>

            <img
                alt="alt-ProfileImageWithDefault"
                {...props}
                src={imageSource || props.src}
                onError={(event) => {
                    event.target.src = defaultPicture;
                }}
            />

        
            
        </React.Fragment>


    );
};

export default ProfileImageWithDefault;

    // {props.provider != 'facebook' && (
    //             <img
    //                 alt="alt-ProfileImageWithDefault"
    //                 {...props}
    //                 // {facebook && (
    //                 //     src={imageSource}
    //                 // )}
                    
    //                 src={props.src || imageSource}
    //                 // src={imageSource}
    //                 // set default image if receive error
    //                 onError={(event) => {
    //                 event.target.src = defaultPicture;
    //                 }}
    //             />
    //         )}