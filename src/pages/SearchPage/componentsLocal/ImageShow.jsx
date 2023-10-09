import React from 'react';
//import styles from './SearchPage.module.css';

const ImageShow = ({ image }) => {

    return (
        //<div>{image.alt_description}</div>
        //<div className={styles.content}>
        <div>
            <img src={image.urls.small} alt={image.alt_description} />
        </div>
    )
}

export default ImageShow;
