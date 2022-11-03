import React from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";

class Quiz extends React.Component {

    state = {
        isQuizGameActivated: false,
    }

    activateQuizGame = () => {
        this.setState({
            isQuizGameActivated: true
        })
    }

    getQuestion() {
        if (!this.state.isQuizGameActivated)
        {
            this.activateNewQuizGame();
            return <div><p>Get ready...</p></div>
        }
        return <QuizQuestion questionText={this.props.currentQuestion.questionText}
                             id={this.props.currentQuestion.id} />
    }

    getVariantsForQuestion() {
        if (!this.state.isQuizGameActivated)
        {
            this.activateNewQuizGame();
            return <div><p>good luck, have fun!</p></div>
        }
        return this.props.currentQuestion.variants
            .map(v => <div key={v.variantNumber}>
                <button onClick={ ()=>{this.props.analyzeUsersAnswer(v, this.props.currentQuestion.id)} } >
                    { v.verbAndParticle }
                </button>
            </div>)
    }

    activateNewQuizGame = () => {
        this.activateQuizGame();
        this.props.startNewQuizGame(true);
        this.props.giveFirstQuestion(0);    //TODO: система задаёт рандомное число
        //TODO: сбросить user_score
        this.props.startNewQuizGame(false);
    }

    render() {
        return (
            <div className={styles.content}>

                { this.getQuestion() }

                { this.getVariantsForQuestion() }

                {/* DEBUG: */}
                <div style={{ padding: "20px", color: "indianred" }}>
                    DEBUG, last guessed variant:
                    <p>{this.props.usersLastGuessedVariant.verbAndParticle}</p>
                </div>
            </div>
        )
    }
}

export default Quiz;