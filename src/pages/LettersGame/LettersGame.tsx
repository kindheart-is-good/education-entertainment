import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchExample} from "../../store/lettersGameSlice";
import {firstExampleWhenStart, setNewExample} from "../../store/lettersGameSlice";
import {IExamplePV} from '../../models/IExamplePV';
import {motion} from "framer-motion";
import styles from "./LettersGame.module.css";


function randomIntegerFromRange(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const LettersGame: React.FC = () => {

    const dispatch = useAppDispatch();
    const {currentExample, isLoading, error} = useAppSelector(state => state.lettersGamePage);
    //const {phrasalVerbs} = useAppSelector(state => state.lettersGamePage);

    const [text, setText] = useState('');
    const [verb, setVerb] = useState('');
    const [particle, setParticle] = useState('');
    //const [currentQuestion, setCurrentQuestion] = useState(null);

    const [isUserGuess, setUsersGuess] = useState(true);
    const [userScore, setUserScore] = useState(50);
    const [scoreMessage, setScoreMessage] = useState("");
    const [userLives, setUserLives] = useState(3);
    const [questionCounter, setQuestionCounter] = useState(-1);
    const [questionId, setQuestionId] = useState(400);
    //const [userAnswered, setUserAnswered] = useState(0);

    const renderCount = useRef(1);
    const inputVerbRef = useRef<HTMLInputElement>(null);
    const buttonVerbRef = useRef<HTMLButtonElement>(null);
    const lettersAmount1 = useRef<HTMLDivElement>(null);
    const lettersAmount2 = useRef<HTMLDivElement>(null);



    useEffect(() => {
        renderCount.current++;
        console.log(" ######## THIS IS NEW RENDER: " + renderCount.current);
        // setVerb("");
        // setParticle("");
        // setText("");
        /*dispatch(firstExampleWhenStart());*/
        //let newRandomIndex = randomIntegerFromRange(1, 3);
        //dispatch(setNewExample(1));
        dispatch(setNewExample(questionCounter+1));
    }, [])

    useEffect(() => {
        setText(''.concat(verb, ' ', particle));
    }, [verb, particle])

    const showIntroduction = () => {
        return (
            <>
                <div className={styles.introduction}>
                    <p>CHECK this Game?</p>
                    <p>Press start button below</p>
                    <p>bro</p>
                    <button className={styles.buttonStart}
                            onClick={()=>{
                                setQuestionCounter(prev => prev + 1);
                                setQuestionId(prev => prev + 1);
                            }}>
                        START THIS GAME
                    </button>
                </div>
            </>
        )
    }

    /*
    const showQuestion = () => {
        return (
            <div className={styles.top}>
                <p>
                    Question #{questionCounter}:
                </p>
                {phrasalVerbs[3].exampleFullUnderscore}
            </div>
        )
    }
    */

    const showQuestion = useCallback((example: IExamplePV | null) => {
        return (
            /*<div className={styles.top}>*/
            <div className={styles.top}>
                <p className={styles.questionTag}>
                    {/*Question #{currentQuestionNumber} (id:{props.id}):*/}
                    Question #{questionCounter + 1}:
                </p>
                <motion.p className={styles.questionText}
                          whileHover={{
                              scale: 1.185,
                          }}
                          whileTap={{
                              color: '#f3f3f3'
                          }}
                >
                    {/*{phrasalVerbs[3].exampleFullUnderscore}*/}
                    {/*{ currentExample?.exampleFullUnderscore }*/}
                    {example?.exampleFullUnderscore}
                    {/*<p>word's length: {example.length}</p>*/}
                </motion.p>
                <p className={styles.questionMeaning}>
                    MEANING: ({example?.meaning})
                </p>
            </div>
        )
    }, [questionCounter])

    const showUserScore = () => {
        if (isUserGuess && questionCounter === 0)
        {
            return <div className={styles.scoreWrapper}>
                <motion.div className={styles.scoreDefault}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <div><span>SCORE:</span> {userScore}</div>
                    {/*<div><span>LIVES:</span> {userLives}</div>*/}
                </motion.div>
            </div>
        }
        if (isUserGuess)
        {
            return <div className={styles.scoreWrapper}>
                <motion.div className={styles.scoreIfUserGuessed}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <div><span>SCORE:</span> {userScore}</div>
                    {/*<div><span>LIVES:</span> {userLives}</div>*/}
                </motion.div>
            </div>
        }
        if (!isUserGuess)
        {
            return <div className={styles.scoreWrapper}>
                <motion.div className={styles.scoreIfUserWrong}
                            whileHover={{
                                scale: 1.12,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    <div><span>SCORE:</span> {userScore}</div>
                    {/*<div><span>LIVES:</span> {userLives}</div>*/}
                </motion.div>

                <motion.div className={styles.scoreMessage}
                            /*animate={{ x: 100 }}
                            transition={{ delay: 1 }}*/
                    >
                    {scoreMessage}
                </motion.div>
            </div>
        }
        return <></>
    }

    const showFinalResult = () => {
        return (
            <>
                <div className={styles.finalResult}>
                    {/*<div><span>LIVES:</span> {userLives}</div>*/}
                    <p style={{color: "orange"}}>sorry my bro, your score: 0</p>
                    <p style={{color: "darkorange"}}>but you grab</p>
                    <motion.div
                        whileHover={{
                            scale: 1.3,
                        }}
                        whileTap={{
                            color: '#f3f3f3'
                        }}>
                        {questionCounter}
                    </motion.div>
                    <p style={{color: "darkorange"}}>questions</p>
                </div>
                {/*<div className={styles.buttonArea}>
                    <button className={styles.buttonOne}
                            onClick={()=>{
                                setQuestionCounter(0);
                            }}>
                        START THIS GAME
                    </button>
                </div>*/}
            </>
        )
    }

    const [isUserInputVerb, setUserInputVerb] = useState(false);
    const [lettersAmountState1, setLettersAmountState1] = useState<number | null>(null);
    const [lettersAmountState2, setLettersAmountState2] = useState<number | null>(null);
    const showInput = () => {
        return (
            <>
                <div className={styles.inputArea}>
                    <div style={{ display: 'flex' }}>
                        <label>
                            <input className={styles.inputElement}
                                type="text"
                                placeholder="verb"
                                value={verb}
                                ref={inputVerbRef}
                                size={6}
                                maxLength={9}
                                onChange={(e) => {
                                        //buttonVerbRef.current?.disabled = true;
                                        //window.document?.getElementById("buttonVerb")?.disabled = true;
                                        //document.querySelector('buttonVerb')?.ariaDisabled;
                                        //document.getElementsByName(localStorage.buttonVerb).disabled

                                        setUserInputVerb(true);
                                        //e.target.className = "inputElement"
                                        //inputVerbRef.current?.className = "inputElement"
                                        setVerb(e.target.value);
                                    }
                                }
                            />
                            <input className={styles.inputElement}
                                type="text"
                                placeholder="particle"
                                value={particle}
                                size={6}
                                maxLength={9}
                                onChange={(e) => setParticle(e.target.value)}
                            />
                            {/* <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={1}
                            size={1}
                            autoFocus={true}
                        />*/}
                        </label>
                    </div>
                    <div>
                        <span className={styles.lettersAmount1}
                             ref={lettersAmount1}
                        >
                            {lettersAmountState1}
                        </span>
                        <span className={styles.lettersAmount2}
                              ref={lettersAmount2}
                        >
                            {lettersAmountState2}
                        </span>
                    </div>
                </div>
            </>
        )
    }

    let counterOpenLetters = useRef(0);
    const [openLettersEnded, setOpenLettersEnded] = useState(false);
    let openLetters = '';
    const [isParticleHintActivate, setParticleHintActivate] = useState(false);
    const [isLettersAmountActivate, setLettersAmountActivate] = useState(false);
    const buttonsPanel = () => {
        return (
            <div className={styles.buttonArea}>
                <button className={styles.buttonOne}
                        onClick={()=>{
                            analyzeUsersAnswer();
                            setVerb('');
                            setParticle('');
                        }}>
                    CHECK ANSWER
                </button>
                <motion.p style={{color: "darkorange", fontSize: "20px", marginTop: "49px"}}
                            whileHover={{
                                scale: 1.18,
                            }}
                            whileTap={{
                                color: '#f3f3f3'
                            }}>
                    HINTS:
                </motion.p>
                <p>
                <button className={styles.buttonTwo}
                        id="buttonVerb"
                        ref={buttonVerbRef}
                        disabled={isUserInputVerb}
                        onClick={()=>{
                            setUsersGuess(false);
                            if (currentExample) {
                                counterOpenLetters.current++;
                                for (let i = 0; i < counterOpenLetters.current; i++) {
                                    openLetters = openLetters.concat(currentExample.exampleVerb[i].toLowerCase());
                                }
                                setVerb(openLetters);
                                setUserScore(prev => prev - 2);
                                setScoreMessage("- 2");
                                if (counterOpenLetters.current === currentExample.exampleVerb.length)
                                {
                                    setOpenLettersEnded(true);
                                    setUserInputVerb(true);
                                    return;
                                }
                            }
                            inputVerbRef.current?.focus();
                        }}>
                    show next verb letter
                </button>
                <button className={styles.buttonTwo}
                        disabled={isParticleHintActivate}
                        onClick={()=>{
                            setParticleHintActivate(true);
                            setUsersGuess(prev => prev = false);
                            if (currentExample) setParticle(currentExample.exampleParticle.toLowerCase());

                            if (!openLettersEnded) inputVerbRef.current?.focus();
                            setUserScore(prev => prev - 5);
                            setScoreMessage("- 5");
                        }}>
                    show particle
                </button>
                <button className={styles.buttonTwo}
                        disabled={isLettersAmountActivate}
                        onClick={()=>{
                            setLettersAmountActivate(true);
                            setUsersGuess(false);
                            //lettersAmount1.current?.innerText = 10;
                            //lettersAmount1.current?.innerHTML = 10;
                            if (currentExample) setLettersAmountState1(currentExample.exampleVerb.length);
                            if (currentExample) setLettersAmountState2(currentExample.exampleParticle.length);
                            setUserScore(prev => prev - 1);
                            setScoreMessage("- 1");
                        }}>
                    how many letters
                </button>
                </p>
            </div>
        )
    }

    /*const analyzeUsersAnswer = (example: IExamplePV, text: string) => {
        console.log(text);*/
    const analyzeUsersAnswer = () => {
        counterOpenLetters.current = 0;
        openLetters = '';
        setOpenLettersEnded(false);
        setUserInputVerb(false);
        setParticleHintActivate(false);
        setLettersAmountActivate(false);
        setLettersAmountState1(null);
        setLettersAmountState2(null);
        console.log('~ questionCounter: ' + questionCounter);
        console.log('~ text.toUpperCase(): ' + text.toUpperCase());
        console.log('~ currentExample (exampleVerb & exampleParticle): ' + currentExample?.exampleVerb + ' ' + currentExample?.exampleParticle);
        console.log('~ userScore: ' + userScore);
        if (text.toUpperCase() === (currentExample?.exampleVerb + ' ' + currentExample?.exampleParticle)) {
            /*if (text.toUpperCase() === (example?.exampleVerb + ' ' + example?.exampleParticle)) {*/
            setUsersGuess(true);
            /*dispatch(fetchExample(questionCounter+1));*/ // <- OLD
            //dispatch(fetchExample(questionId+1));
            // ВРЕМЕННО ЗАМЕНИЛ fetchExample() на setNewExample()
            dispatch(setNewExample(questionCounter+1));
            setUserScore(prev => prev + 10);
            setScoreMessage("+ 10");
            setQuestionCounter(prev => prev + 1);
            setQuestionId(prev => prev + 1);
            return;
        }
        setUsersGuess(false);
        /*dispatch(fetchExample(questionCounter+1));*/ // <- OLD
        //dispatch(fetchExample(questionId+1));
        // ВРЕМЕННО ЗАМЕНИЛ fetchExample() на setNewExample()
        dispatch(setNewExample(questionCounter+1));
        setUserScore(prev => prev - 10);
        /*setUserLives(prev => prev - 1);*/
        setScoreMessage("- 10");
        setQuestionCounter(prev => prev + 1);
        setQuestionId(prev => prev + 1);
        console.log('* userScore: ' + userScore);
    }



    return (
        <div className={styles.quizWrapper}>
            {(questionCounter < 0)
                ?
                    showIntroduction()
                :
                /*(questionCounter < 4)*/
                (userScore > 0)
                    ?
                    <>
                        { showQuestion(currentExample) }
                        { showUserScore() }
                        { showInput() }
                        { buttonsPanel() }
                    </>
                    :
                    <>
                        { showFinalResult()}
                    </>
            }
        </div>
    )
}

export default LettersGame;