import React, { useContext, useState } from "react";
import CardsContext from "../../../context/cards";
import styles from "./CardCreate.module.css";

const CardCreate = () => {
  const [title, setTitle] = useState("");
  const { createCard } = useContext(CardsContext);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createCard(title);
    setTitle("");
  };

  return (
    <div className={styles.cardCreate}>
      <h3>Add a Card</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input className={styles.input} value={title} onChange={handleChange} />
        <button className={styles.button}>Create!</button>
      </form>
    </div>
  );
};

export default CardCreate;
