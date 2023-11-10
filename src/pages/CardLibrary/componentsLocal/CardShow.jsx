import React from "react";
import styles from "./Cards.module.css";

const CardShow = ({ card }) => {

    return (
        <div className={styles.cardShow}>
            {card.title}
        </div>
    )
}

export default CardShow;
