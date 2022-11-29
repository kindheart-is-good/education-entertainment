import React, {useCallback, useEffect, useState} from "react";
import styles from "./Quiz.module.css"
import {motion} from "framer-motion";
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
    const [isNewLevel, setNewLevel] = useState(false);

    const [question, setCurrentQuestion] = useState('');
    const [questionCounter, setQuestionCounter] = useState(0);
    const [isUserGuess, setUsersGuess] = useState(false);
    const [usersLastChosenVariant, setUsersLastChosenVariant] = useState('');
    const [userScore, setUserScore] = useState(0);

    useEffect( () => {
        props.setNewQuestion(randomInteger(1, 12));
        setCurrentQuestion(props.currentQuestion);
        console.log("QUESTION FROM useEffect ||| props.id: " + props.currentQuestion.id + ', q.id' + question.id);
    }, [] )

    /*useEffect( () => {
        if (isUserGuess) {
            props.setNewQuestion(randomInteger(1, 11));
            setCurrentQuestion(props.currentQuestion);
        }
    }, [isNewLevel] )*/

    useEffect( () => {
        if (isUserGuess) {
            setNewLevel(true);

            /*console.log("useEffect #2 isUserGuess: " + isUserGuess);
            console.log("useEffect #2 isNewLevel: " + isNewLevel);*/

            setTimeout(() => {
                setNewLevel(false);
                /*console.log("useEffect #3 isUserGuess: " + isUserGuess);
                console.log("useEffect #3 isNewLevel: " + isNewLevel);*/
            }, 500)
        }
    }, [questionCounter] )

    useEffect( () => {
        console.log("--- NEW LEVEL");
    }, [isNewLevel] )

    useEffect( () => {
        console.log("--------- USER GUESS");
    }, [isUserGuess] )

    /*const activateNewQuizGame = useCallback(() => {*/
    const activateNewQuizGame = () => {
        setActivation(true);
        setGameFinished(false);
        setClickCounter(0);
        setUsersGuess(false);
        setNewLevel(true);

        props.setNewQuestion(randomInteger(1, 12));     // не успевает передать (доходит после сворачивания окна), возможно из-за асинхронщины. Поэтому временным решением добавил дополнительное условие внутри getQuestion(). Второе решние добавить useEffect
        setCurrentQuestion(props.currentQuestion);
        console.log("QUESTION FROM activateNewQuizGame() ||| props.id: " + props.currentQuestion.id + ', q.id' + question.id);
        setQuestionCounter(1);
        setUserScore(0);
        props.resetUserActivity();
    }
    /*}, [isGameFinished])*/

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

    const showIntroduction = () => {
        return (
            <div className={styles.introduction}>
                <p>CHECK this QUIZ Game?</p>
                <p>Press start button below</p>
                <p>bro</p>
            </div>
        )
    }

    const getQuestion = useCallback(() => {
        /*console.log('QUESTION: ' + question.questionText);*/
        return <QuizQuestion questionText={question.questionText}
                                    currentQuestionNumber={questionCounter}
                                    id={question.id}
        />
    }, [isNewLevel])
    /*}, [questionCounter])*/

    const showQuestion = () => {
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
            return getQuestion();
        }
        if (!isQuizGameActivated)
        {
            return showIntroduction()
        }
        return <></>
    }

    const buttonVariantsAnimation = {
        visible: i => ({
            opacity: 1,
            /*y: 0,*/
            transition: {
                delay: i * 0.3,
            }
        }),
        hidden: {
            opacity: 0,
            /*y: -100,*/
        }
    }

    const getVariants = useCallback(() => {
        return <div className={styles.variants}>
            { question.variants.map((v, i) => (
                <motion.div key={v.verbAndParticle+clickCounter}
                            variants={buttonVariantsAnimation}
                            initial='hidden'
                            animate='visible'
                            custom={i}>
                {/*<motion.div key={v.verbAndParticle+clickCounter}
                            initial={{
                                x:-1000,
                            }}
                            animate={{
                                x: 0,
                            }}
                            transition={{
                                delay: 0.5
                            }}>*/}
                    <QuizVariantButton
                        v={v}
                        usersWrongSelectedVariants={props.usersWrongSelectedVariants}
                        analyzeUsersAnswer={analyzeUsersAnswer}
                    />
                </motion.div>
            ))}
        </div>
    }, [isNewLevel])

    const showVariantsForQuestion = () => {
        if (isQuizGameActivated && !isGameFinished)
        {
            return getVariants();
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

                {props.usersChosenVariants.map((v, i) => (
                    <div key={i}>
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
            {/*<p><span>isQuizGameActivated:</span> {isQuizGameActivated.toString()}</p>
            <p><span>isGameFinished:</span> {isGameFinished.toString()}</p>*/}
            <p><span>clickCounter:</span> {clickCounter}</p>
            <p><span>isUserGuess:</span> {isUserGuess.toString()}</p>
            <p><span>isNewLevel:</span> {isNewLevel.toString()}</p>
            <p><span>questionCounter:</span> {questionCounter}</p>
            <p><span>que.id:</span> {question.id}</p>
            <p><span>que.questionText:</span> {question.questionText}</p>
            <p><span>usersLastChosenVariant:</span> {usersLastChosenVariant.verbAndParticle}</p>
        </div>
    }

    const [newQuestionIndex, setNewQuestionIndex] = useState(0);
    let newRandomIndex = 0;

    const generateNewQuestion = () => {
        newRandomIndex = randomInteger(1, 5);
        setNewQuestionIndex(newRandomIndex);
        /*alert('newQuestionIndex = ' + newRandomIndex + ', question id = ' + question.id);*/

        //debugger;
        if (props.previousQuestions.length > 0) {
            //debugger;
            while (props.previousQuestions.some(q => q.id === newRandomIndex))
            {
                console.log('wrong INDEX = ' + newRandomIndex + ', question id = ' + question.id)
                newRandomIndex = randomInteger(1, 6);
                setNewQuestionIndex(newRandomIndex);
                //debugger;
                console.log('FIXED INDEX = ' + newRandomIndex + ', question id = ' + question.id);
                //debugger;
            }
        }
        //debugger;
        props.setNewQuestion(newQuestionIndex);
        setCurrentQuestion(props.currentQuestion);
        console.log(` ||||||||| newRandomIndex = ${newRandomIndex}, 
         ~ newQuestionIndex = ${newQuestionIndex}, 
         ~ question id = ${question.id}`)
    }

    const analyzeUsersAnswer = (variant) => {
        /*props.getPlayerStartingActivity();*/
        setClickCounter(prev => prev + 1);

        setUsersLastChosenVariant(variant);

        if (variant.isVariantTrue) {
            props.analyzeRightUsersAnswer(variant);
            console.log('YES');
            setUsersGuess(true);
            setUserScore(prev => prev + 10);

            props.savePrevQuestions(question);
            /*props.previousQuestions.forEach((item, index, array) => {
                console.log(`q.id #${item.id} имеет позицию ${index} в ${array}`);
            });*/

            if (questionCounter < props.numberOfQuestionsForGame)
            {
                setQuestionCounter(prev => prev + 1);
                generateNewQuestion();
            }
            else {
                setGameFinished(true)
                props.previousQuestions.forEach((item, index, array) => {
                    console.log(`q.id #${item.id} имеет позицию ${index} в ${array}`);
                });
            }
        }
        else {
            props.analyzeWrongUsersAnswer(variant);
            console.log('NO');
            setUsersGuess(false);
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

            { showQuestion() }

            { showVariantsForQuestion() }

            { showUserProgress() }

            { showUserScore() }

            { showTips() }

            { showDebugSection() }
        </div>
    )
}

export default Quiz;