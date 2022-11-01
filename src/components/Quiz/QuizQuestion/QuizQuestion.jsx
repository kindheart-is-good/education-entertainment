import React from "react";
import styles from "./QuizQuestion.module.css"
import {NavLink} from "react-router-dom";

const QuizQuestion = (props) => {
    let path = "/quiz/" + props.id;

    return (
            <div className={styles.question}>
                <NavLink to={path}>{props.questionText}</NavLink>
            </div>
    )
}

export default QuizQuestion;