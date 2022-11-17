import React, {useEffect, useState} from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizVariantButton from "./QuizVariantButton/QuizVariantButton";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const Quiz = (props) =>  {

    let [isQuizGameActivated, setActivation] = useState(false);
    let [question, setQuestion] = useState(props.currentQuestion);
    let [clickCounter, setClickCounter] = useState(0);

    useEffect( () => {
        setTimeout(() => {
            setQuestion(props.currentQuestion);
        }, 100)

        console.log("useEffect #1: " + question.questionText);

    /*}, [props.isNewGameActivatorRun] )*/
    /*}, [] )*/
    /*}, [props.isUserGuessedVariant] )*/
    }, [clickCounter] )

    const activateNewQuizGame = () => {
        setActivation(true);
        props.startNewQuizGame(true);
        props.giveFirstQuestion(randomInteger(1, 11));
        props.resetUserScore();
        setQuestion(props.currentQuestion);     // не успевает передать (доходит после сворачивания окна), возможно из-за асинхронщины. Поэтому временным решением добавил дополнительное условие внутри getQuestion()
        setClickCounter(0);
        props.startNewQuizGame(false);
    }

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
            /*    временное дополнительное условие.   */
        if (isQuizGameActivated && !props.isGameFinished && clickCounter===0)
        {
            return <QuizQuestion questionText={props.currentQuestion.questionText}
            /*return <QuizQuestion questionText={question.questionText}*/
                                 currentQuestionNumber={props.currentQuestionNumber}
                                 id={props.currentQuestion.id}
            />
        }
        if (isQuizGameActivated && !props.isGameFinished)
        {
            /*return <QuizQuestion questionText={props.currentQuestion.questionText}*/
            return <QuizQuestion questionText={question.questionText}
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
                                               isItNewQuestion={props.isItNewQuestion}
                                               isUserGuessedVariant={props.isUserGuessedVariant}
                                               analyzeUsersAnswer={props.analyzeUsersAnswer}
                                               getPlayerStartingActivity={props.getPlayerStartingActivity}
                                               setNewLevel={props.setNewLevel}
                                               usersLastChosenVariant={props.usersLastChosenVariant}
                                               usersWrongSelectedVariants={props.usersWrongSelectedVariants}
                                               setClickCounter={setClickCounter}
                                               clickCounter={clickCounter}
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
            const progressElement = document.createElement('div')
            progressElement.className = 'progressDiv'

            for (let i = 0; i < props.currentQuestionNumber; i++) {
                const insideExistDiv = document.getElementsByClassName('userProgress')[0];
                insideExistDiv.appendChild(progressElement)
            }
        }

        if (isQuizGameActivated) {
            return <div className={styles.userProgress}>
                <div className={styles.progressText}>
                    {props.currentQuestionNumber} / {props.numberOfQuestionsForGame}
                </div>

                {/*{()=>{createSmallField()}}*/}

                {props.usersChosenVariants
                    .map(v => <div key={v.verbAndParticle + v.variantNumber}>
                        {/*{v.isVariantTrue && props.isUserGuessedVariant*/}
                        {v.isVariantTrue
                            ? <div className={styles.progressDivIfGuess}></div>
                            : <div className={styles.progressDivIfWrong}></div>
                        }
                    </div>)
                }
            </div>
        }
        return <></>
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
            {/*<p><span>from hook: isQuizGameActivated:</span> {isQuizGameActivated.toString()}</p>
            <p><span>isNewGameActivatorRun:</span> {props.isNewGameActivatorRun.toString()}</p>
            <p><span>isUserStarted:</span> {props.isUserStarted.toString()}</p>
            <p><span>isWasFirstClickOnNewQuestion:</span> {props.isWasFirstClickOnNewQuestion.toString()}</p>
            <p><span>isUserGuessedVariant:</span> {props.isUserGuessedVariant.toString()}</p>
            <p><span>isGameFinished:</span> {props.isGameFinished.toString()}</p>*/}

            <p><span>props.currentQuestionNumber:</span> {props.currentQuestionNumber}</p>
            <p><span>currentQuestionId:</span> {props.currentQuestion.id}</p>
            <p><span>props.currentQuestion:</span> {props.currentQuestion.questionText}</p>
            <p><span>props.nextQuestionId:</span> {props.nextQuestionId}</p>
            <p><span>props.nextQuestion:</span> {props.nextQuestion.questionText}</p>
            <p><span>from hook: question:</span> {question.questionText}</p>
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