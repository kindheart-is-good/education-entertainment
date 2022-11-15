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
        this.props.giveFirstQuestion(0);    // TODO: система задаёт рандомное число
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
                                 currentQuestionNumber={this.props.currentQuestionNumber}
                                 id={this.props.currentQuestion.id}
            />
        }
        if (this.state.isQuizGameActivated && this.props.isGameFinished)
        {
            return <></>
        }
        return <div className={styles.introduction}>
            <p>CHECK this QUIZ Game?</p>
            <p>Press start button below</p>
            <p>bro</p>
        </div>
    }

    getVariantsForQuestion() {
        if (this.state.isQuizGameActivated && !this.props.isGameFinished)
        {
            return <div className={styles.variants}>
                { this.props.currentQuestion.variants
                    .map(v => <div key={v.variantNumber}>
                            <QuizVariantButton v={v}
                                               variantNumber={v.variantNumber}
                                               verbAndParticle={v.verbAndParticle}
                                               currentQuestionId={this.props.currentQuestion.id}
                                               isUserStarted={this.props.isUserStarted}
                                               isWasFirstClickOnNewQuestion={this.props.isWasFirstClickOnNewQuestion}
                                               isUserGuessedVariant={this.props.isUserGuessedVariant}
                                               analyzeUsersAnswer={this.props.analyzeUsersAnswer}
                                               getPlayerStartingActivity={this.props.getPlayerStartingActivity}
                                               getPlayerActivity={this.props.getPlayerActivity}
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

    showUserProgress() {

        function createSmallField() {
            const card = document.createElement('div')
            card.className = 'progressDiv'

            for(let i = 0; i < this.props.currentQuestionNumber; i++) {
                const   insideExistDiv = document.getElementsByClassName('userProgress')[0];
                insideExistDiv.appendChild(card)
            }
        }

        return <div className={styles.userProgress}>
            <div className={styles.progressText}>
                {this.props.currentQuestionNumber} / {this.props.numberOfQuestionsForGame}
            </div>

            {/*{()=>{createSmallField()}}*/}

            { this.props.usersChosenVariants
                .map(v => <div key={v.id}>
                    {/*{v.isVariantTrue && this.props.isUserGuessedVariant*/}
                    {v.isVariantTrue
                        ? <div className={styles.progressDivIfGuess}></div>
                        : <div className={styles.progressDivIfWrong}></div>
                    }
                </div>)
            }
        </div>
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

    debugSection() {
        return <div className={styles.debugSection}>
            {/*<p><span>currentQuestionNumber:</span> {this.props.currentQuestionNumber}</p>*/}
            <p><span>this.state: isQuizGameActivated:</span> {this.state.isQuizGameActivated.toString()}</p>
            <p><span>isNewGameActivatorRun:</span> {this.props.isNewGameActivatorRun.toString()}</p>
            <p><span>isUserStarted:</span> {this.props.isUserStarted.toString()}</p>
            <p><span>isWasFirstClickOnNewQuestion:</span> {this.props.isWasFirstClickOnNewQuestion.toString()}</p>
            <p><span>isUserGuessedVariant:</span> {this.props.isUserGuessedVariant.toString()}</p>
            <p><span>isGameFinished:</span> {this.props.isGameFinished.toString()}</p>
        </div>
    }

    render() {
        return (
            <div className={styles.quizWrapper}>
                { this.showButtonStart() }

                { this.getQuestion() }

                { this.getVariantsForQuestion() }

                { this.showUserProgress() }

                { this.showUserScore() }

                { this.showTips() }

                { this.debugSection() }
            </div>
        )
    }
}

export default Quiz;