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
        if (this.state.isQuizGameActivated)
        {
            return <QuizQuestion questionText={this.props.currentQuestion.questionText}
                                 id={this.props.currentQuestion.id}
            />
        }
        return <div>Want to check this Quiz Game? Press Start button below</div>
    }

    getVariantsForQuestion() {
        if (this.state.isQuizGameActivated)
        {
            return this.props.currentQuestion.variants
                .map(v => <div key={v.variantNumber}>
                    <button onClick={ ()=>{this.props.analyzeUsersAnswer(v, this.props.currentQuestion.id)} } >
                        { v.verbAndParticle }
                    </button>
                </div>)
        }
        return <div>bro</div>
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

                <div>
                    <button onClick={ ()=>{this.activateNewQuizGame()} } className={styles.buttonStart}>
                        start new game
                    </button>
                </div>

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