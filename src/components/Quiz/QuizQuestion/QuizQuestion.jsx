import React from "react";
import styles from "./QuizQuestion.module.css"
import {motion} from "framer-motion";

const QuizQuestion = (props) => {
    return (
            <div className={styles.question}>
                <p className={styles.questionTag}>
                    {/*Question #{props.currentQuestionNumber} (id:{props.id}):*/}
                    Question #{props.currentQuestionNumber}:
                </p>
                <motion.p className={styles.questionText}
                          whileHover={{
                              scale: 1.185,
                          }}
                          whileTap={{
                              color: '#f3f3f3'
                          }}
                >
                    {props.questionText}
                </motion.p>
            </div>
    )
}

export default QuizQuestion;