import React, { useEffect } from "react";
import useCardsContext from "../../hooks/use-cards-context";
import styles from "./CardLibrary.module.css";
import CardCreate from "./components-local/CardCreate";
import CardList from "./components-local/CardList";

const CardLibrary = () => {
  const { fetchCards } = useCardsContext();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    /*<div>number of elements in cards array is: {cards.length}</div>*/
    <div className={styles.content}>
      <h1>List of Cards</h1>
      <CardList />
      <CardCreate />
    </div>
  );
};

export default CardLibrary;
