import React, { useEffect, useContext } from "react";
import CardsContext from "../../context/cards";
import styles from "./CardLibrary.module.css";
import CardCreate from "./componentsLocal/CardCreate";
import CardList from "./componentsLocal/CardList";

const CardLibrary = () => {
  const { fetchCards } = useContext(CardsContext);

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
