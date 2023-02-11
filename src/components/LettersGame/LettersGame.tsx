import React, {useState} from "react";
import styles from "./LettersGame.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";

const LettersGame: React.FC = () => {

    const dispatch = useAppDispatch();
    const {phrasalVerbs} = useAppSelector(state => state.lettersGamePage);

    const [text, setText] = useState('');

    return (
        <div className={styles.quizWrapper}>
            <div className={styles.top}>
                {phrasalVerbs[0].verbAndParticle}
                <p>{text}</p>
            </div>

            <div className={styles.mid}>
                <div style={{ display: 'flex' }}>
                    <label>
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
                    </label>
                    <label>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size={1}
                        />
                    </label>
                </div>
            </div>

            <div className={styles.bot}>
                <button className={styles.buttonOne} onClick={()=>{
                    /*dispatch(addTrackToMix({text}));*/
                    setText('');
                }}>
                    Add Track
                </button>
            </div>
        </div>
    );
};

export default LettersGame;