import React, {useState} from "react";
import styles from "./CardLibrary.module.css"
import CardCreate from "./componentsLocal/CardCreate"
import CardList from "./componentsLocal/CardList";

const CardLibrary = () => {

    const [cards, setCards] = useState([]);

    const createCard = (title) => {
        //console.log('Need to add card with:', title);
        const updatedCards = [
            ...cards,
            {
                id: Math.round(Math.random() * 9999),
                title   // Эта запись тоже самое что и: { id: 123, title: title}
            },
        ];
        setCards(updatedCards);
    }

    return (
        /*<div>number of elements in cards array is: {cards.length}</div>*/
        <div className={styles.content}>
            <CardList cards={cards} />
            <CardCreate onCreate={createCard} />
        </div>
    )
}

export default CardLibrary;
