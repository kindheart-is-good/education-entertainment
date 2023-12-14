import React, { useContext } from "react";
import CardsContext from "../../../context/cards";
import styles from "./CardShow.module.css";
import CardShow from "./CardShow";

const CardList = () => {
  const { cards } = useContext(CardsContext);

  const renderedCards = cards.map((card) => {
    return <CardShow key={card.id} card={card} />;
  });

  return <div className={styles.cardList}>{renderedCards}</div>;
};

export default CardList;
