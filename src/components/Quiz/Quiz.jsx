import React from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";

const Quiz = (props) => {

    let variantElements = props.questions[0].variants
        .map(v => <div key={v.id}>
            <button onClick={() => {v.isVariantTrue && props.userChoose(v.variantNumber) } } >
                { v.verbAndParticle }
            </button>
        </div>)

    return (
        <div className={styles.content}>
            <QuizQuestion question={props.questions[0].questionText}
                          id={props.questions[0].id} />
            { variantElements }
        </div>
    )
}

export default Quiz;