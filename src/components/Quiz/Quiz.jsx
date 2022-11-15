import React, {useEffect, useState} from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizVariantButton from "./QuizVariantButton/QuizVariantButton";

const Quiz = (props) =>  {

    let [isQuizGameActivated, setActivation] = useState(false);

    const activateQuizGame = () => {
        setActivation(true);
    }

    const activateNewQuizGame = () => {
        activateQuizGame();
        props.startNewQuizGame(true);
        props.giveFirstQuestion(0);    // TODO: система задаёт рандомное число
        props.resetUserScore();
        props.startNewQuizGame(false);
    }

    useEffect( () => {
        /*setActivation(true);*/
        /*<div className={styles.debugSection}>asdsad</div>*/
    }, [isQuizGameActivated] )

    const showButtonStart = () => {
        if (!isQuizGameActivated || props.isGameFinished)
        {
            return <div className={styles.startQuiz}>
                <button onClick={ ()=>{activateNewQuizGame()} } className={styles.buttonStart}>
                    START THIS GAME
                </button>
            </div>
        }
        return <></>
    }

    const getQuestion = () => {
        if (isQuizGameActivated && !props.isGameFinished)
        {
            return <QuizQuestion questionText={props.currentQuestion.questionText}
                                 currentQuestionNumber={props.currentQuestionNumber}
                                 id={props.currentQuestion.id}
            />
        }
        if (isQuizGameActivated && props.isGameFinished)
        {
            return <></>
        }
        return <div className={styles.introduction}>
            <p>CHECK this QUIZ Game?</p>
            <p>Press start button below</p>
            <p>bro</p>
        </div>
    }

    const getVariantsForQuestion = () => {
        if (isQuizGameActivated && !props.isGameFinished)
        {
            return <div className={styles.variants}>
                { props.currentQuestion.variants
                    .map(v => <div key={v.variantNumber}>
                            <QuizVariantButton v={v}
                                               variantNumber={v.variantNumber}
                                               verbAndParticle={v.verbAndParticle}
                                               currentQuestionId={props.currentQuestion.id}
                                               isUserStarted={props.isUserStarted}
                                               /*isWasFirstClickOnNewQuestion={props.isWasFirstClickOnNewQuestion}*/
                                               isUserGuessedVariant={props.isUserGuessedVariant}
                                               analyzeUsersAnswer={props.analyzeUsersAnswer}
                                               getPlayerStartingActivity={props.getPlayerStartingActivity}
                                               /*getPlayerActivity={props.getPlayerActivity}*/
                            />
                        </div>
                        )}
                    </div>
        }
        if (isQuizGameActivated && props.isGameFinished)
        {
            return showFinalResult();
        }
        return <></>
    }

    const showTips = () => {
        if (isQuizGameActivated && !props.isGameFinished && !props.isUserGuessedVariant && props.isUserStarted)
        {
            return <div className={styles.tipIfUserWrong}>
                <b>MEANING of this phrasal verb:</b>
                <p>{props.usersLastChosenVariant.meaning}</p>
            </div>
        }
        if (isQuizGameActivated && !props.isGameFinished && props.isUserGuessedVariant)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b></p> <p>{props.usersLastGuessedVariant.verbAndParticle}</p>
                <p><b>example of using:</b></p> <p>{props.usersLastGuessedVariant.example}</p>
            </div>
        }
        if (isQuizGameActivated && props.isGameFinished && props.isUserGuessedVariant)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b> {props.usersLastGuessedVariant.verbAndParticle}</p>
                <p><b>example of using:</b> {props.usersLastGuessedVariant.example}</p>
            </div>
        }
        return <></>
    }

    const showUserProgress = () => {

        function createSmallField() {
            const card = document.createElement('div')
            card.className = 'progressDiv'

            for(let i = 0; i < props.currentQuestionNumber; i++) {
                const   insideExistDiv = document.getElementsByClassName('userProgress')[0];
                insideExistDiv.appendChild(card)
            }
        }

        return <div className={styles.userProgress}>
            <div className={styles.progressText}>
                {props.currentQuestionNumber} / {props.numberOfQuestionsForGame}
            </div>

            {/*{()=>{createSmallField()}}*/}

            { props.usersChosenVariants
                .map(v => <div key={v.verbAndParticle+v.variantNumber}>
                    {/*{v.isVariantTrue && props.isUserGuessedVariant*/}
                    {v.isVariantTrue
                        ? <div className={styles.progressDivIfGuess}></div>
                        : <div className={styles.progressDivIfWrong}></div>
                    }
                </div>)
            }
        </div>
    }

    const showUserScore = () => {
        if (isQuizGameActivated && !props.isGameFinished && props.isUserGuessedVariant)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreDefault}>
                    <span>SCORE:</span> {props.userScore}
                </div>
            </div>
        }
        if (isQuizGameActivated && !props.isGameFinished && !props.isUserGuessedVariant && !props.isUserStarted)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserGuessed}>
                    <span>SCORE:</span> {props.userScore}
                </div>
            </div>
        }
        if (isQuizGameActivated && !props.isGameFinished && !props.isUserGuessedVariant && props.isUserStarted)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserWrong}>
                    <span>SCORE:</span> {props.userScore}
                </div>
            </div>
        }
        return <></>
    }

    const showFinalResult = () => {
        return <div className={styles.scoreFinalResult}>
            <p>your score: {props.userScore}</p>
        </div>
    }

    const debugSection = () => {
        return <div className={styles.debugSection}>
            {/*<p><span>currentQuestionNumber:</span> {props.currentQuestionNumber}</p>*/}
            <p><span>from hook: isQuizGameActivated:</span> {isQuizGameActivated.toString()}</p>
            <p><span>isNewGameActivatorRun:</span> {props.isNewGameActivatorRun.toString()}</p>
            <p><span>isUserStarted:</span> {props.isUserStarted.toString()}</p>
            {/*<p><span>isWasFirstClickOnNewQuestion:</span> {props.isWasFirstClickOnNewQuestion.toString()}</p>*/}
            <p><span>isUserGuessedVariant:</span> {props.isUserGuessedVariant.toString()}</p>
            <p><span>isGameFinished:</span> {props.isGameFinished.toString()}</p>
        </div>
    }

    return (
        <div className={styles.quizWrapper}>
            { showButtonStart() }

            { getQuestion() }

            { getVariantsForQuestion() }

            { showUserProgress() }

            { showUserScore() }

            { showTips() }

            { debugSection() }
        </div>
    )
}

export default Quiz;