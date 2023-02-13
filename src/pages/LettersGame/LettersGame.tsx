import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchExample} from "../../store/lettersGameSlice";
import {firstExampleWhenStart} from "../../store/lettersGameSlice";
import {IExamplePV} from '../../models/IExamplePV';
import {motion} from "framer-motion";
import styles from "./LettersGame.module.css";

const LettersGame: React.FC = () => {

    const dispatch = useAppDispatch();
    const {currentExample, isLoading, error} = useAppSelector(state => state.lettersGamePage);
    //const {phrasalVerbs} = useAppSelector(state => state.lettersGamePage);

    const [text, setText] = useState('');
    const [verb, setVerb] = useState('');
    const [particle, setParticle] = useState('');
    //const [currentQuestion, setCurrentQuestion] = useState(null);

    const [userScore, setUserScore] = useState(0);
    const [userLives, setUserLives] = useState(3);
    const [questionCounter, setQuestionCounter] = useState(-1);
    //const [userAnswered, setUserAnswered] = useState(0);

    const renderCount = useRef(1);
    const inputRef = useRef<HTMLInputElement>(null);



    useEffect(() => {
        renderCount.current++;
        console.log(" ######## THIS IS NEW RENDER: " + renderCount.current);
        // setVerb("");
        // setParticle("");
        // setText("");
        dispatch(firstExampleWhenStart());
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
                    <button className={styles.buttonOne}
                            onClick={()=>{
                                setQuestionCounter(prev => prev + 1);
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
            <div className={styles.top}>
                <p>
                    Question #{questionCounter + 1}:
                </p>
                {/*{phrasalVerbs[3].exampleFullUnderscore}*/}
                {/*{ currentExample?.exampleFullUnderscore }*/}
                {example?.exampleFullUnderscore}
                {/*<p>word's length: {example.length}</p>*/}
                <p>
                    MEANING: ({example?.meaning})
                </p>
            </div>
        )
    }, [questionCounter])

    const showUserScore = () => {
        return (
            <div className={styles.scoreWrapper}>
                <div><span>SCORE:</span> {userScore}</div>
                <div><span>LIVES:</span> {userLives}</div>
            </div>
        )
    }

    const showFinalResult = () => {
        return (
            <>
                <div className={styles.scoreFinalResult}>
                    <div><span>LIVES:</span> {userLives}</div>
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

    const showInput = () => {
        return (
            <>
                <div className={styles.inputArea}>
                    <div style={{ display: 'flex' }}>
                        <label>
                            <input
                                type="text"
                                placeholder="type verb here"
                                value={verb}
                                ref={inputRef}
                                onChange={(e) => setVerb(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="type particle here"
                                value={particle}
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
                        {/*<label>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size={1}
                        />
                    </label>
                    <label>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size={1}
                        />
                    </label>*/}
                    </div>
                </div>
            </>
        )
    }

    const buttonsPanel = () => {
        return (
            <div className={styles.buttonArea}>
                <button className={styles.buttonOne}
                        onClick={()=>{
                            //setUserAnswered(prev => prev + 1);
                            compare();
                            setVerb('');
                            setParticle('');
                        }}>
                    CHECK ANSWER
                </button>
                <p>
                HINT:
                <button className={styles.buttonTwo}
                        onClick={()=>{
                            if (currentExample) setParticle(currentExample.exampleParticle.toLowerCase());
                            inputRef.current?.focus();
                            setUserScore(prev => prev - 5);
                        }}>
                    Show particles
                </button>
                HINT:
                <button className={styles.buttonTwo}
                        onClick={()=>{
                            if (currentExample) setVerb(currentExample.exampleVerb[0].toLowerCase());
                            inputRef.current?.focus();
                            setUserScore(prev => prev - 3);
                        }}>
                    Show first verb letter
                </button>
                </p>
            </div>
        )
    }

    /*const compare = (example: IExamplePV, text: string) => {
        console.log(text);*/
    const compare = () => {
        console.log(text.toUpperCase());
        console.log(currentExample?.exampleVerb + ' ' + currentExample?.exampleParticle);
        console.log(userScore);
        if (text.toUpperCase() === (currentExample?.exampleVerb + ' ' + currentExample?.exampleParticle)) {
            /*if (text.toUpperCase() === (example?.exampleVerb + ' ' + example?.exampleParticle)) {*/
            dispatch(fetchExample(questionCounter+1));
            setUserScore(prev => prev + 10);
            setQuestionCounter(prev => prev + 1);
            return;
        }
        dispatch(fetchExample(questionCounter+1));
        setUserScore(prev => prev - 10);
        setUserLives(prev => prev - 1);
        setQuestionCounter(prev => prev + 1);
        console.log(userScore);
    }



    return (
        <div className={styles.quizWrapper}>
            {(questionCounter < 0)
                ?
                    showIntroduction()
                :
                (userLives > 0 && questionCounter < 4)
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