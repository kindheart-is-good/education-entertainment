import React, {useState} from "react";
import styles from "./Cards.module.css";

const CardEdit = ({ card, onSubmit }) => {
    const [title, setTitle] = useState(card.title);

    const handleSubmit = (event) => {
        event.preventDefault();     // To cancel the default behaviour which is for the browser to try to handle the submission process itself.
        //console.log('~~~ New title:', title);
        onSubmit(card.id, title);
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <form className={styles.bookEdit} onSubmit={handleSubmit}>
            <label>Title</label>
            <input className={styles.input} value={title} onChange={handleChange} />
            <button className={styles.buttonIsPrimary}>
                Save
            </button>
        </form>
    )
}

export default CardEdit;
