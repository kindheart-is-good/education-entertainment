import React from "react";
import styles from "./QuizVariantButton.module.css"

const QuizVariantButton = (props) => {

    return (
            <div className={styles.variantButton}>
                <button onClick={props.onUserVariant}>{props.variant}</button>
            </div>
    )
}

export default QuizVariantButton;