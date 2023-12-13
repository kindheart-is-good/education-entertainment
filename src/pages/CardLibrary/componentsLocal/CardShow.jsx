import React, { useState } from "react";
import CardEdit from "./CardEdit";
import styles from "./CardShow.module.css";

const CardShow = ({ card, onEdit, onDelete }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleDeleteClick = () => {
    onDelete(card.id);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
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
