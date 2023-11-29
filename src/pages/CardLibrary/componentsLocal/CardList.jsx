import React from "react";
import CardShow from "./CardShow";
import styles from "./Cards.module.css";

const CardList = ({ cards, onDelete }) => {

    const renderedCards = cards.map((card) => {
        return <CardShow key={card.id} card={card} onDelete={onDelete} />
    })

    return (
        <div className={styles.cardList}>
            {renderedCards}
        </div>
    )
}

export default CardList;
