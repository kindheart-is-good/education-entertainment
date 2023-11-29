import React from "react";
import styles from "./Cards.module.css";

const CardShow = ({ card, onDelete }) => {

    const handleClick = () => {
        onDelete(card.id);
    }

    return (
        <div className={styles.cardShow}>
            {card.title}
            <div className={styles.actions}>
                <button className={styles.delete} onClick={handleClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default CardShow;
