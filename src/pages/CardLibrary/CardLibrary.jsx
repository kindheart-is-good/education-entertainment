import React, { useEffect, useState } from "react";
import styles from "./CardLibrary.module.css";
import CardCreate from "./componentsLocal/CardCreate";
import CardList from "./componentsLocal/CardList";
import axios from "axios";

const CardLibrary = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await axios.get(
      process.env.REACT_APP_JSON_SERVER_URL + "/cards"
    );
    setCards(response.data);
  };

  const createCard = async (title) => {
    //console.log('Need to add card with:', title);

    const response = await axios.post(
        process.env.REACT_APP_JSON_SERVER_URL + "/cards",
        {
          title,
        }
    );
    //console.log(response);

    const updatedCards = [
      ...cards,
      /*{
          id: Math.round(Math.random() * 9999),
          title
        },*/
      response.data,
    ];
    setCards(updatedCards);
  };

  const editCardById = async (id, newTitle) => {
    const response = await axios.put(
      process.env.REACT_APP_JSON_SERVER_URL + `/cards/${id}`,
      {
        title: newTitle,
      }
    );
    //console.log(response);

    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, ...response.data };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const deleteCardById = async (id) => {
    await axios.delete(
      process.env.REACT_APP_JSON_SERVER_URL + `/cards/${id}`
    );

    const updatedCards = cards.filter((card) => {
      return card.id !== id;
    });
    setCards(updatedCards);
  };

  return (
    /*<div>number of elements in cards array is: {cards.length}</div>*/
    <div className={styles.content}>
      <h1>List of Cards</h1>
      <CardList cards={cards} onEdit={editCardById} onDelete={deleteCardById} />
      <CardCreate onCreate={createCard} />
    </div>
  );
};

export default CardLibrary;
