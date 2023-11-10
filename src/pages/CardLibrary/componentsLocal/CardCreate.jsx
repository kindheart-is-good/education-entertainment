import React, {useState} from "react";
import styles from "./Cards.module.css";

const CardCreate = ({ onCreate }) => {

    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onCreate(title);
        setTitle('');
    }

    return (
        <div className={styles.cardCreate}>
            <h3>Add a Card</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className={styles.input} value={title} onChange={handleChange} />
                <button className={styles.button}>Create!</button>
            </form>
        </div>
    )
}

export default CardCreate;
