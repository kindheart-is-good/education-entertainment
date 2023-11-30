import React, {useState} from "react";
import styles from "./Cards.module.css";
import CardEdit from "./CardEdit";

const CardShow = ({ card, onEdit, onDelete }) => {
    const [showEdit, setShowEdit] = useState(false);

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    const handleDeleteClick = () => {
        onDelete(card.id);
    }

    const handleSubmit = (id, newTitle) => {
        setShowEdit(false);
        onEdit(id, newTitle);
    }

    let content = <h3>{card.title}</h3>;
    if (showEdit) {
        content = <CardEdit card={card} onSubmit={handleSubmit} />;
    }

    return (
        <div className={styles.cardShow}>
            <div>{content}</div>
            <div className={styles.actions}>
                <button className={styles.edit} onClick={handleEditClick}>
                    Edit
                </button>
                <button className={styles.delete} onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default CardShow;
