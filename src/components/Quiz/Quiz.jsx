import React from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizVariantButton from "./QuizVariantButton/QuizVariantButton";

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
        this.props.giveFirstQuestion(10);    //TODO: система задаёт рандомное число
        this.props.resetUserScore();
        this.props.startNewQuizGame(false);
    }

    showButtonStart() {
        if (!this.state.isQuizGameActivated || this.props.isGameFinished)
        {
            return <div className={styles.startQuiz}>
                <button onClick={ ()=>{this.activateNewQuizGame()} } className={styles.buttonStart}>
                    START THIS GAME
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
        return <div className={styles.introduction}>
            <p>CHECK this QUIZ Game!</p>
            <p>Press Start button below</p>
            <p>bro</p>
        </div>
    }

    getVariantsForQuestion() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return <div className={styles.variants}>
                { this.props.currentQuestion.variants
                    .map(v => <div key={v.variantNumber}>
                            <QuizVariantButton variantNumber={v.variantNumber}
                                               isUserGuessedVariant={this.props.isUserGuessedVariant}
                                               isUserStarted={this.props.isUserStarted}
                                               currentQuestionId={this.props.currentQuestion.id}
                                               v={v}
                                               verbAndParticle={v.verbAndParticle}
                                               analyzeUsersAnswer={this.props.analyzeUsersAnswer}
                                               userStartedActivity={this.props.userStartedActivity}
                            />
                        </div>
                        )}
                    </div>
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished)
        {
            return this.showFinalResult();
        }
        return <></>
    }

    showTips() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished && !this.props.isUserGuessedVariant && this.props.isUserStarted)
        {
            return <div className={styles.tipIfUserWrong}>
                <b>MEANING of this phrasal verb:</b>
                <p>{this.props.usersLastChosenVariant.meaning}</p>
            </div>
        }
        if (this.state.isQuizGameActivated && !this.props.isGameFinished && this.props.isUserGuessedVariant)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b></p> <p>{this.props.usersLastGuessedVariant.verbAndParticle}</p>
                <p><b>example of using:</b></p> <p>{this.props.usersLastGuessedVariant.example}</p>
            </div>
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished && this.props.isUserGuessedVariant)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b> {this.props.usersLastGuessedVariant.verbAndParticle}</p>
                <p><b>example of using:</b> {this.props.usersLastGuessedVariant.example}</p>
            </div>
        }
        return <></>
    }

    showUserScore() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished && this.props.isUserGuessedVariant)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreDefault}>
                    <span>SCORE:</span> {this.props.userScore}
                </div>
            </div>
        }
        if (this.state.isQuizGameActivated && !this.props.isGameFinished && !this.props.isUserGuessedVariant && !this.props.isUserStarted)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserGuessed}>
                    <span>SCORE:</span> {this.props.userScore}
                </div>
            </div>
        }
        if (this.state.isQuizGameActivated && !this.props.isGameFinished && !this.props.isUserGuessedVariant && this.props.isUserStarted)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserWrong}>
                    <span>SCORE:</span> {this.props.userScore}
                </div>
            </div>
        }
        return <></>
    }

    showFinalResult() {
        return <div className={styles.scoreFinalResult}>
            <p>your score: {this.props.userScore}</p>
        </div>
    }

    render() {
        return (
            <div className={styles.quizWrapper}>
                { this.showUserScore() }

                { this.getQuestion() }

                { this.getVariantsForQuestion() }

                { this.showButtonStart() }

                { this.showTips() }
            </div>
        )
    }
}

export default Quiz;