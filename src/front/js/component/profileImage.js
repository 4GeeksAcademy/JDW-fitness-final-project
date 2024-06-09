import React from 'react';
import PropTypes from 'prop-types';

const ProfileImage = ({ photoUrl, altText = "Profile Image", className = "img-thumbnail", style = { maxWidth: "200px" } }) => {
    return (
        <div>
            {photoUrl ? (
                <img src={photoUrl} alt={altText} className={className} style={style} />
            ) : (
                <div className={className} style={{ ...style, backgroundColor: '#f0f0f0', textAlign: 'center', lineHeight: '200px' }}>
                    No Image
                </div>
            )}
        </div>
    );
};

ProfileImage.propTypes = {
    photoUrl: PropTypes.string,
    altText: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

export default ProfileImage;
