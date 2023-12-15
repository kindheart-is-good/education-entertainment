import React, { useState } from "react";
import useCardsContext from "../../../hooks/use-cards-context";
import styles from "./CardEdit.module.css";

const CardEdit = ({ card, onSubmit }) => {
  const [title, setTitle] = useState(card.title);
  const { editCardById } = useCardsContext();

  const handleSubmit = (event) => {
    event.preventDefault(); // To cancel the default behaviour which is for the browser to try to handle the submission process itself.
    //console.log('~~~ New title:', title);
    onSubmit();
    editCardById(card.id, title);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className={styles.cardEdit}>
      <form onSubmit={handleSubmit}>
        <label>New title:</label>
        <input value={title} onChange={handleChange} />
        <button className={styles.buttonIsPrimary}>Save</button>
      </form>
    </div>
  );
};

export default CardEdit;
