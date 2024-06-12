import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from "/workspaces/JDW-fitness-final-project/src/front/img/default-image.jpg";

const ProfileImage = ({ photoUrl, altText = "Profile Image", className = "", style = {}, rounded = false }) => {
    const combinedStyle = {
        borderRadius: rounded ? "50%" : "0px",
        objectFit: "cover",
        ...style,
    };

    return (
        <img
            src={photoUrl || defaultImg}
            alt={altText}
            className={`img-fluid ${className}`}
            style={combinedStyle}
        />
    );
};

ProfileImage.propTypes = {
    photoUrl: PropTypes.string,
    altText: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    rounded: PropTypes.bool,
};

export default ProfileImage;
