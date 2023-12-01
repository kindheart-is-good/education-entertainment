import React, {useState} from "react";
import styles from "./CardLibrary.module.css"
import CardCreate from "./componentsLocal/CardCreate"
import CardList from "./componentsLocal/CardList";

const CardLibrary = () => {

    const [cards, setCards] = useState([]);

    const editCardById = (id, newTitle) => {
        const updatedCards = cards.map((card) => {
            if (card.id === id) {
                return { ...card, title: newTitle };
            }
            return card;
        });
        setCards(updatedCards);
    };

    const deleteCardById = (id) => {
      const updatedCards = cards.filter((card) => {
        return card.id !== id;
      });
      setCards(updatedCards);
    };

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
            <h1>List of Cards</h1>
            <CardList cards={cards} onEdit={editCardById} onDelete={deleteCardById} />
            <CardCreate onCreate={createCard} />
        </div>
    )
}

export default CardLibrary;
