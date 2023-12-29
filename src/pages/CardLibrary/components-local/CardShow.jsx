import React, { useState } from "react";
import useCardsContext from "../../../hooks/use-cards-context";
import styles from "./CardShow.module.css";
import CardEdit from "./CardEdit";

const CardShow = ({ card }) => {
  const [showEdit, setShowEdit] = useState(false);
  const { deleteCardById } = useCardsContext();

  const handleDeleteClick = () => {
    deleteCardById(card.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    setShowEdit(false);
  };

  let content = <h3>{card.title}</h3>;
  if (showEdit) {
    content = <CardEdit card={card} onSubmit={handleSubmit} />;
  }

  return (
    <div className={styles.cardShow}>
      <img
        className={styles.cardPhoto}
        alt="image-of-card"
        src={`https://picsum.photos/seed/${card.id}/300/200`}
      />
      <div>{content}</div>
      <div className={styles.actions}>
        <button className={styles.buttonEdit} onClick={handleEditClick}>
          Edit
        </button>
        <button className={styles.buttonDelete} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardShow;
