import React, {useState} from 'react';
import styles from './SearchPage.module.css';
import SearchBar from "./componentsLocal/SearchBar";
import ImageList from "./componentsLocal/ImageList";
import searchImages from "../../api/UnsplashFreeAPI/api";

const SearchPage = () => {

    const [images, setImages] = useState([]);

    const handleSubmit = async (term) => {
        //console.log('Do a search with', term);
        const result = await searchImages(term);
        //console.log(result);
        setImages(result);
    }

    return (
        <div className={styles.content}>
            <SearchBar onSubmit={handleSubmit} />
            <ImageList images={images} />
        </div>
    )
}

export default SearchPage;
