import React from "react";
import useCardsContext from "../../../hooks/use-cards-context";
import styles from "./CardShow.module.css";
import CardShow from "./CardShow";

const CardList = () => {
  const { cards } = useCardsContext();

  const renderedCards = cards.map((card) => {
    return <CardShow key={card.id} card={card} />;
  });

  return <div className={styles.cardList}>{renderedCards}</div>;
};

export default CardList;
