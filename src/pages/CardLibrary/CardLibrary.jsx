import React, { useEffect } from "react";
import useCardsContext from "../../hooks/use-cards-context";
import styles from "./CardLibrary.module.css";
import CardCreate from "./componentsLocal/CardCreate";
import CardList from "./componentsLocal/CardList";

const CardLibrary = () => {
  const { fetchCards } = useCardsContext();

  useEffect(() => {
    fetchCards();
  }, []);

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
