import React, {useCallback, useEffect, useRef, useState} from "react";
import styles from "./Quiz.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {motion} from "framer-motion";
import QuizQuestion from "./QuizQuestion/QuizQuestion";
import QuizVariantButton from "./QuizVariantButton/QuizVariantButton";
import Modal from "../Modal/Modal";
import quizSlice,
    {setNewQuestion, analyzeRightUsersAnswer, analyzeWrongUsersAnswer,
    resetUserActivity, savePrevQuestions} from "../../store/quizSlice";
import {IPhrasalVerbQuiz, IPhrasalVerbVariant} from "../../models/IPhrasalVerbQuiz";

function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

/*let renderCount = 1;*/

const Quiz: React.FC = () => {

    const dispatch = useAppDispatch();
    //const {resetUserActivity} = quizSlice.actions;

    const {currentQuestion} = useAppSelector(state => state.quizPage);
    const usersLastChosenVariant = useAppSelector(state => state.quizPage.usersLastChosenVariant);
    const usersChosenVariants = useAppSelector(state => state.quizPage.usersChosenVariants);
    const {previousQuestions} = useAppSelector(state => state.quizPage);
    const numberOfQuestionsForGame = useAppSelector(state => state.quizPage.numberOfQuestionsForGame);

    const [isQuizGameActivated, setActivation] = useState(false);
    const [isGameFinished, setGameFinished] = useState(false);
    const [clickCounter, setClickCounter] = useState(0);
    const [isUserGuess, setUsersGuess] = useState(false);
    const [isNewLevel, setNewLevel] = useState(false);
    const [questionCounter, setQuestionCounter] = useState(0);

    //const [question, setCurrentQuestion] = useState(null);
    const [usersLChosenVariant, setUsersLChosenVariant] = useState<IPhrasalVerbVariant | null>();
    const [userScore, setUserScore] = useState(0);
    const [modalActive, setModalActive] = useState(false);

    let int: number = 0;
    let renderCount = useRef(1);

    useEffect(() => {
        /*console.log(" ######## THIS IS NEW RENDER: " + setRenderCount(prev => prev + 1));*/
        renderCount.current++;
        console.log(" ######## THIS IS NEW RENDER: " + renderCount.current);
    })

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
        console.log("--- isNewLevel");
    }, [isNewLevel] )

    useEffect( () => {
        console.log("------ isUserGuess");
    }, [isUserGuess] )

    useEffect( () => {
        console.log("--------- questionCounter");
    }, [questionCounter] )

    /*const activateNewQuizGame = useCallback(() => {*/
    const activateNewQuizGame = () => {
        setActivation(true);
        setGameFinished(false);
        setClickCounter(0);
        setUsersGuess(false);
        setNewLevel(true);

        int = randomInteger(1, 19);
        dispatch(setNewQuestion(int));     // не успевает передать (доходит после сворачивания окна), возможно из-за асинхронщины. Поэтому временным решением добавил дополнительное условие внутри getQuestion(). Второе решние добавить useEffect
        //setCurrentQuestion(currentQuestion);
        //console.log(`||| Question FROM activateNewQuizGame() \n||| props.id: ${currentQuestion.id}, q.id: ${question.id}`);
        setQuestionCounter(1);
        setUserScore(0);
        dispatch(resetUserActivity());
    }
    /*}, [isGameFinished])*/

    const showButtonStart = () => {
        if (!isQuizGameActivated || (isGameFinished && questionCounter<=1))
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
        if (isGameFinished && questionCounter>1)
        {
            return (
                <div className={styles.startQuiz}>
                    <button className={styles.buttonStart}
                            onClick={ ()=>{activateNewQuizGame()} } >
                        START NEW GAME
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
        /*return <QuizQuestion questionText={currentQuestion.questionText}*/
        return <QuizQuestion questionText={currentQuestion?.questionText}
                             currentQuestionNumber={questionCounter}
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
        visible: (i: number) => ({
            opacity: 1,
            /*y: 0,*/
            transition: {
                delay: i * 0.8,
            }
        }),
        hidden: {
            opacity: 0,
            /*y: -100,*/
        }
    }

    const getVariants = useCallback(() => {
        return <div className={styles.variants}>
            { currentQuestion?.variants.map((v, i) => (
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
                        //usersWrongSelectedVariants={usersWrongSelectedVariants}
                        analyzeUsersAnswer={analyzeUsersAnswer}
                    />
                </motion.div>
            ))}
        </div>
    }, [isNewLevel])    // пробовал: modalActive

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
                <p>{usersLastChosenVariant?.meaning}</p>
            </div>
        }
        /*if (isQuizGameActivated && !isGameFinished && isUserGuess)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b></p> <p>{usersLastChosenVariant.verbAndParticle}</p>
                <p><b>example of using:</b></p> <p>{usersLastChosenVariant.example}</p>
            </div>
        }*/
        /*if (isQuizGameActivated && isGameFinished && isUserGuess)
        {
            return <div className={styles.tipIfUserGuessed}>
                <p><b>last guessed variant:</b> {usersLastChosenVariant.verbAndParticle}</p>
                <p><b>example of using:</b> {usersLastChosenVariant.example}</p>
            </div>
        }*/
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

        if (clickCounter === 0)
            return <></>

        if (isQuizGameActivated) {
            return <div className={styles.userProgress}>
                <motion.div className={styles.progressText}
                            whileHover={{
                                scale: 1.23,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    {questionCounter} / {numberOfQuestionsForGame}
                </motion.div>

                {/*{()=>{createSmallField()}}*/}

                {usersChosenVariants?.map((v, i) => (
                    <div key={i}>
                        {v.isRightAnswer
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
                <motion.div className={styles.scoreDefault}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <span>SCORE:</span> {userScore}
                </motion.div>
            </div>
        }
        /*if (isQuizGameActivated && !isGameFinished && !isUserGuess && !props.isUserStarted)*/
        if (isQuizGameActivated && !isGameFinished && !isUserGuess && clickCounter===0)
        {
            return <div className={styles.scoreWrapper}>
                <motion.div className={styles.scoreIfUserGuessed}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <span>SCORE:</span> {userScore}
                </motion.div>
            </div>
        }
        /*if (isQuizGameActivated && !isGameFinished && !isUserGuess && props.isUserStarted)*/
        if (isQuizGameActivated && !isGameFinished && !isUserGuess)
        {
            return <div className={styles.scoreWrapper}>
                <motion.div className={styles.scoreIfUserWrong}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <span>SCORE:</span> {userScore}
                </motion.div>
            </div>
        }
        return <></>
    }

    const showFinalResult = () => {
        return <div className={styles.scoreFinalResult}>
            <p style={{color: "orange"}}>Congratulations to you bro</p>
            <p style={{color: "darkorange"}}>Your score:</p>
            <motion.div
                whileHover={{
                    scale: 1.3,
                }}
                whileTap={{
                    color: '#f3f3f3'
                }}>
                {userScore}
            </motion.div>
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
            <p><span>userScore:</span> {userScore}</p>
            <p><span>usersLChosenVariant:</span> {usersLChosenVariant?.verbAndParticle}</p>
            <p><span>usersLastChosenVariant:</span> {usersLastChosenVariant?.verbAndParticle}</p>
            {/*<p><span>usersChosenVariants:</span> {usersChosenVariants[0]?.verbAndParticle}</p>*/}
            <p><span>currentQuestion:</span> {currentQuestion?.questionText}</p>
            <p><span>previousQuestions:</span> {previousQuestions[0]?.questionText}</p>
            <p><span>numberOfQuestionsForGame:</span> {numberOfQuestionsForGame}</p>
        </div>
    }

    //const [newQuestionIndex, setNewQuestionIndex] = useState(0);
    //let newRandomIndex = 0;

    /*const generateNewQuestion = () => {
        console.log(`Generate new question:
                   \n~ isQuizGameActivated = ${isQuizGameActivated},
                   \n~ isGameFinished = ${isGameFinished},
                   \n~ isNewLevel = ${isNewLevel},
                   \n~ clickCounter = ${clickCounter},
                   \n~ questionCounter = ${questionCounter},
                   \n~ isUserGuess = ${isUserGuess},
                   \n~ usersLChosenVariant = ${usersLChosenVariant?.example},
                   \n~ userScore = ${userScore},
                   \n~ modalActive = ${modalActive},
                   \n^ usersLastChosenVariant = ${usersLastChosenVariant?.example},
                   \n^ usersLChosenVariant = ${usersLChosenVariant?.example},
                   \n^ usersChosenVariants[0] = ${usersChosenVariants?.verbAndParticle},
                   \n^ previousQuestions[0] = ${previousQuestions[0]?.questionText},
                   \n`);
    }*/
    const generateNewQuestion = () => {
        /*newRandomIndex = randomInteger(1, 18);
        setNewQuestionIndex(newRandomIndex);*/
        //int = randomInteger(1, 19);
        //setNewQuestionIndex(randomInteger(1, 25));

        /*if (previousQuestions.length > 0) {
            //debugger;
            // console.log(`@ question id = ${question.id},
            //            \n@ props.currentQ id = ${currentQuestion.id},
            //            \n@ newQuestionIndex = ${newQuestionIndex},
            //            \n@ newRandomIndex = ${newRandomIndex}`)

            while (previousQuestions.some(q => q.id === newQuestionIndex))
            {
                console.log('wrong INDEX = ' + newQuestionIndex + ', question id = ' + currentQuestion?.id)
                /!*newRandomIndex = randomInteger(1, 18);
                setNewQuestionIndex(newRandomIndex);*!/
                setNewQuestionIndex(randomInteger(1, 25));
                //debugger;
                console.log('FIXED INDEX = ' + newQuestionIndex + ', question id = ' + currentQuestion?.id);
                //debugger;
                if (previousQuestions.some(q => q.id !== newQuestionIndex)) break;
            }
        }*/

        let newRandomIndex = randomInteger(1, 25);
        dispatch(setNewQuestion(newRandomIndex));
        //dispatch(setNewQuestion(int));
        //setCurrentQuestion(currentQuestion);
        // console.log(`~ question id = ${question.id},
        //            \n~ props.currentQ id = ${currentQuestion.id},
        //            \n~ newQuestionIndex = ${newQuestionIndex},
        //            \n~ newRandomIndex = ${newRandomIndex}`);
        /*      После ответа, question.id = предыдущему вопросу
            question.id:           отстаёт на 1 вопрос.     Т.е. после ответа на 1 вопрос сожержит номер 1 вопроса
            currentQuestion:       содержит текущий вопрос. Т.е. после ответа на 1 вопрос содержит номер 2 вопроса
            newQuestionIndex:      опережает на 1 вопроса.  Т.е. после ответа на 1 вопрос содержит номер 3 вопроса
            newRandomIndex:        опережает на 2 вопроса.  Т.е. после ответа на 1 вопрос содержит номер 4 вопроса
         */
    }

    const openModalWindow = useCallback(() => {
        setModalActive(true);
    }, [isNewLevel])

    /*const analyzeUsersAnswer = (variant) => setTimeout(() => {*/
    const analyzeUsersAnswer = (variant: IPhrasalVerbVariant) => {
        //debugger;
        setClickCounter(prev => prev + 1);
        setUsersLChosenVariant(variant);

        if (variant.isRightAnswer) {
            console.log('* YES');
            dispatch(analyzeRightUsersAnswer(variant));
            setUsersGuess(true);
            setUserScore(prev => prev + 10);

            /*dispatch(savePrevQuestions({question}));*/
            if (currentQuestion) dispatch(savePrevQuestions(currentQuestion));

            openModalWindow();

            if (questionCounter < numberOfQuestionsForGame)
            {
                //setNewLevel(true);
                setQuestionCounter(prev => prev + 1);
                generateNewQuestion();
            }
            else {
                setGameFinished(true)
                // previousQuestions.forEach((item, index, array) => {
                //     console.log(`q.id #${item.id} имеет позицию ${index} в ${array}`);
                // });
            }
        }
        else {
            console.log('* NO');
            dispatch(analyzeWrongUsersAnswer(variant));
            setUsersGuess(false);
            setUserScore(prev => prev - 5);
        }
    }
    /*}, 1000);*/

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

            {/*{ showDebugSection() }*/}

            <Modal active={modalActive} setActive={setModalActive}>
                <div>
                    <motion.div className={styles.modalTitle}
                                whileHover={{
                                    scale: 1.123,
                                }}
                                whileTap={{
                                    color: '#f3f3f3'
                                }}>
                        <b>ViCTORY!
                            <p>Right answer is: {usersLastChosenVariant?.verbAndParticle}</p></b>
                    </motion.div>
                    <div className={styles.modalAboutAnswer}>
                        <p><b>meaning:</b></p> <motion.p
                        whileHover={{
                            scale: 1.01,
                        }}
                        whileTap={{
                            color: '#f3f3f3'
                        }}>
                        {usersLastChosenVariant?.meaning}</motion.p>
                        <p><b>example of using:</b></p> <motion.p
                        whileHover={{
                            scale: 1.01,
                        }}
                        whileTap={{
                            color: '#f3f3f3'
                        }}>
                        {usersLastChosenVariant?.example}</motion.p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Quiz;