import React from "react";
import defaultPicture from '../assets/profile.png'

export const ProfileImageWithDefault = props => {
    const { image } = props;



    return <img src={image ? image : defaultPicture} alt='Profile' {...props} />

};