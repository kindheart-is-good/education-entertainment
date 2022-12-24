import React from "react";
import styles from "./QuizQuestion.module.css"
import {motion} from "framer-motion";

interface QuizQuestionProps {
    currentQuestionNumber: number,
    questionText: string | undefined,

}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
                                                       currentQuestionNumber, questionText,
                                                }) => {

    //setUsersGuess(false);
    //setNewLevel(true);

    return (
        <div className={styles.question}>
            <p className={styles.questionTag}>
                {/*Question #{currentQuestionNumber} (id:{props.id}):*/}
                Question #{currentQuestionNumber}:
            </p>
            <motion.p className={styles.questionText}
                      whileHover={{
                          scale: 1.185,
                      }}
                      whileTap={{
                          color: '#f3f3f3'
                      }}
            >
                {questionText}
            </motion.p>
        </div>
    )
}

export default QuizQuestion;