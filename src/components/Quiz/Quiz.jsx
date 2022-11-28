import React, {useEffect, useState} from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizVariantButton from "./QuizVariantButton/QuizVariantButton";

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const Quiz = (props) =>  {

    const [isQuizGameActivated, setActivation] = useState(false);
    const [isGameFinished, setGameFinished] = useState(false);
    const [clickCounter, setClickCounter] = useState(0);

    const [question, setCurrentQuestion] = useState('');
    const [questionCounter, setQuestionCounter] = useState(1);
    const [isUserGuess, setUsersGuess] = useState(false);
    const [usersLastChosenVariant, setUsersLastChosenVariant] = useState('');
    const [userScore, setUserScore] = useState(0);

    useEffect( () => {
        props.setNewQuestion(randomInteger(1, 11));
        setCurrentQuestion(props.currentQuestion);
    }, [] )

    const activateNewQuizGame = () => {
        setActivation(true);
        setGameFinished(false);
        setClickCounter(0);
        setUsersGuess(false);

        /*setCurrentQuestion(props.questions[0]);*/
        props.setNewQuestion(randomInteger(1, 11));     // не успевает передать (доходит после сворачивания окна), возможно из-за асинхронщины. Поэтому временным решением добавил дополнительное условие внутри getQuestion()
        setCurrentQuestion(props.currentQuestion);
        setQuestionCounter(1);
        setUserScore(0);
        props.resetUserActivity();

        /*props.startNewQuizGame(true);*/
            /*props.giveFirstQuestion(randomInteger(1, 11));*/
            /*setQuestion(props.currentQuestion);*/     // не успевает передать (доходит после сворачивания окна), возможно из-за асинхронщины. Поэтому временным решением добавил дополнительное условие внутри getQuestion()
        /*props.startNewQuizGame(false);*/
    }

    const showButtonStart = () => {
        if (!isQuizGameActivated || isGameFinished)
        {
            return (
                <div className={styles.startQuiz}>
                    <button className={styles.buttonStart}
                            onClick={ ()=>{activateNewQuizGame()} } >
                        START THIS GAME
                    </button>
                </div>
            )
        }
        return <></>
    }

    const getQuestion = () => {
            /*    временное дополнительное условие.   */
        /*if (isQuizGameActivated && !isGameFinished && clickCounter===0)
        {
            return <QuizQuestion questionText={question.questionText}
                                 currentQuestionNumber={questionCounter}
                                 id={question.id}
            />
        }*/
        if (isQuizGameActivated && !isGameFinished)
        {
            return <QuizQuestion questionText={question.questionText}
                                 currentQuestionNumber={questionCounter}
                                 id={question.id}
            />
        }
        if (isQuizGameActivated && isGameFinished)
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
        if (isQuizGameActivated && !isGameFinished)
        {
            return <div className={styles.variants}>
                { props.currentQuestion.variants.map(v => (
                    <div key={v.variantNumber}>
                            <QuizVariantButton
                                v={v}
                                usersWrongSelectedVariants={props.usersWrongSelectedVariants}
                                analyzeUsersAnswer={analyzeUsersAnswer}
                            />
                    </div>
                ))}
                </div>
        }
        if (isQuizGameActivated && isGameFinished)
        {
            return showFinalResult();
        }
        return <></>
    }

    const showTips = () => {
        /*if (isQuizGameActivated && !isGameFinished && !isUserGuess && props.isUserStarted)*/
        if (isQuizGameActivated && !isGameFinished && !isUserGuess && clickCounter>0)
        {
            return <div className={styles.tipIfUserWrong}>
                <b>MEANING of this phrasal verb:</b>
                <p>{usersLastChosenVariant.meaning}</p>
            </div>
        }
        if (isQuizGameActivated && !isGameFinished && isUserGuess)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b></p> <p>{usersLastChosenVariant.verbAndParticle}</p>
                <p><b>example of using:</b></p> <p>{usersLastChosenVariant.example}</p>
            </div>
        }
        if (isQuizGameActivated && isGameFinished && isUserGuess)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b> {usersLastChosenVariant.verbAndParticle}</p>
                <p><b>example of using:</b> {usersLastChosenVariant.example}</p>
            </div>
        }
        return <></>
    }

    const showUserProgress = () => {

        function createSmallField() {
            const progressElement = document.createElement('div')
            progressElement.className = 'progressDiv'

            for (let i = 0; i < questionCounter; i++) {
                const insideExistDiv = document.getElementsByClassName('userProgress')[0];
                insideExistDiv.appendChild(progressElement)
            }
        }

        if (isQuizGameActivated) {
            return <div className={styles.userProgress}>
                <div className={styles.progressText}>
                    {questionCounter} / {props.numberOfQuestionsForGame}
                </div>

                {/*{()=>{createSmallField()}}*/}

                {props.usersChosenVariants.map(v => (
                    <div key={v.verbAndParticle}>
                        {v.isVariantTrue
                            ? <div className={styles.progressDivIfGuess}></div>
                            : <div className={styles.progressDivIfWrong}></div>
                        }
                    </div>))
                }
            </div>
        }
        return <></>
    }

    const showUserScore = () => {
        if (isQuizGameActivated && !isGameFinished && isUserGuess)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreDefault}>
                    <span>SCORE:</span> {userScore}
                </div>
            </div>
        }
        /*if (isQuizGameActivated && !isGameFinished && !isUserGuess && !props.isUserStarted)*/
        if (isQuizGameActivated && !isGameFinished && !isUserGuess && clickCounter===0)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserGuessed}>
                    <span>SCORE:</span> {userScore}
                </div>
            </div>
        }
        /*if (isQuizGameActivated && !isGameFinished && !isUserGuess && props.isUserStarted)*/
        if (isQuizGameActivated && !isGameFinished && !isUserGuess)
        {
            return <div className={styles.scoreWrapper}>
                <div className={styles.scoreIfUserWrong}>
                    <span>SCORE:</span> {userScore}
                </div>
            </div>
        }
        return <></>
    }

    const showFinalResult = () => {
        return <div className={styles.scoreFinalResult}>
            <p>your score: {userScore}</p>
        </div>
    }

    const showDebugSection = () => {
        return <div className={styles.debugSection}>
            <p><span>isQuizGameActivated:</span> {isQuizGameActivated.toString()}</p>
            <p><span>isGameFinished:</span> {isGameFinished.toString()}</p>
            <p><span>clickCounter:</span> {clickCounter}</p>
            <p><span>isUserGuess:</span> {isUserGuess.toString()}</p>
            <p><span>questionCounter:</span> {questionCounter}</p>
            <p><span>que.id:</span> {question.id}</p>
            <p><span>que.questionText:</span> {question.questionText}</p>
            <p><span>usersLastChosenVariant:</span> {usersLastChosenVariant.verbAndParticle}</p>
        </div>
    }

    const analyzeUsersAnswer = (variant) => {
        /*props.getPlayerStartingActivity();*/
        setClickCounter(prev => prev + 1);

        setUsersLastChosenVariant(variant);

        if (variant.isVariantTrue) {
            props.analyzeRightUsersAnswer(variant);

            setUsersGuess(true);
            console.log('YES');

            if (questionCounter < props.numberOfQuestionsForGame)
            {
                setQuestionCounter(prev => prev + 1);
                props.setNewQuestion(randomInteger(1, 11));
                setCurrentQuestion(props.currentQuestion);

                setUserScore(prev => prev + 10);
            }
            else {
                setGameFinished(true)
            }
        }
        else {
            props.analyzeWrongUsersAnswer(variant);

            setUsersGuess(false);
            console.log('NO');

            setUserScore(prev => prev - 5);
        }
    }

    /*
    const handleAnswer = (variant) => {
        prepareNewQuestion();
        analyzeUsersAnswer(variant);
    }
    */

    return (
        <div className={styles.quizWrapper}>
            { showButtonStart() }

            { getQuestion() }

            { getVariantsForQuestion() }

            { showUserProgress() }

            { showUserScore() }

            { showTips() }

            { showDebugSection() }
        </div>
    )
}

export default Quiz;