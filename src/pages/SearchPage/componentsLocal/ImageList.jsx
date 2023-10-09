import React from 'react';
import ImageShow from "./ImageShow";
import styles from './ImageList.module.css';

const ImageList = ({ images }) => {

    const renderedImages = images.map((image) => {
        return <ImageShow key={image.id} image={image} />
    })

    return (
        //<div>number of images: {images.length}</div>
        <div className={styles.imageList}>
            {renderedImages}
        </div>
    )
}

export default ImageList;
