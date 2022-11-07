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

    activateNewQuizGame = () => {
        this.activateQuizGame();
        this.props.startNewQuizGame(true);
        this.props.giveFirstQuestion(0);    //TODO: система задаёт рандомное число
        this.props.resetUserScore();
        this.props.startNewQuizGame(false);
    }

    showButtonStart() {
        if (!this.state.isQuizGameActivated || this.props.isGameFinished)
        {
            return <div>
                <button onClick={ ()=>{this.activateNewQuizGame()} } className={styles.buttonStart}>
                    start new game
                </button>
            </div>
        }
        return <></>
    }

    getQuestion() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return <QuizQuestion questionText={this.props.currentQuestion.questionText}
                                 id={this.props.currentQuestion.id}
            />
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished)
        {
            return <></>
        }
        return <div className={styles.introduction}>Want to check this Quiz Game? Press Start button below</div>
    }

    getVariantsForQuestion() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return this.props.currentQuestion.variants
                .map(v => <div key={v.variantNumber}>
                    <button className={styles.variantButton}
                            onClick={ ()=>{this.props.analyzeUsersAnswer(v, this.props.currentQuestion.id)} } >
                        { v.verbAndParticle }
                    </button>
                </div>)
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished)
        {
            return this.showResult();
        }
        return <div>bro</div>
    }

    showUserScore() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return <div className={styles.userScore}>
                SCORE: {this.props.userScore}
            </div>
        }
        return <div></div>
    }

    showResult() {
        return <div className={styles.userScoreResult}>
            {/*<p>your last guessed variant: {this.props.usersLastGuessedVariant.verbAndParticle}</p>*/}
            <p>your score: {this.props.userScore}</p>
        </div>
    }

    showDebugSection() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return <div className={styles.debugSection}>
                DEBUG, last guessed variant:
                <p>{this.props.usersLastGuessedVariant.verbAndParticle}</p>
            </div>
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished)
        {
            return <div className={styles.debugSectionResult}>
                DEBUG, last guessed variant:
                <p>{this.props.usersLastGuessedVariant.verbAndParticle}</p>
            </div>
        }

        return <div></div>
    }

    render() {
        return (
            <div className={styles.content}>

                { this.showUserScore() }

                { this.getQuestion() }

                { this.getVariantsForQuestion() }

                { this.showButtonStart() }

                {/*     DEBUG:      */}
                { this.showDebugSection() }
            </div>
        )
    }
}

export default Quiz;