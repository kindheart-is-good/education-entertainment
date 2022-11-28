import React from "react";
import styles from "./QuizQuestion.module.css"

const QuizQuestion = (props) => {
    return (
            <div className={styles.question}>
                <p className={styles.questionTag}>
                    {/*Question #{props.currentQuestionNumber} (id:{props.id}):*/}
                    Question #{props.currentQuestionNumber}:
                </p>
                <p className={styles.questionText}>
                    {props.questionText}
                </p>
            </div>
    )
}

export default QuizQuestion;