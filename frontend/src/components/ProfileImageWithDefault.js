import React from "react";
import defaultPicture from '../assets/profile.png'

export const ProfileImageWithDefault = props => {
    const { image, tempimage } = props;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'images/profile/' + image;
    }

    return <img
        src={tempimage || imageSource}
        alt='Profile' {...props}
        onError={
            (event) => {
                event.target.src = defaultPicture;
            }
        } />

};