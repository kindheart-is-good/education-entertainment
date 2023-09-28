import React, {useState} from 'react';
import styles from './DynamicContentGame.module.css';
import WordShow from "./WordShow/WordShow";

function getRandomWord() {
    const words = ['bird', 'cat', 'cow', 'dog', 'gator', 'horse'];

    return words[Math.floor(Math.random() * words.length)];
}

const DynamicContentGame = () => {

    const [words, setWords] = useState([]);

    const handleClick = () => {
        console.log('Button was clicked!')
        setWords([...words, getRandomWord()])
    }

    const renderedWords = words.map((word, index) => {
        return <WordShow type={word} key={index} />
    })

    return (
        <div className={styles.content}>
            <button className={styles.buttonAdd} onClick={handleClick}>Add Figure</button>
            <div className={styles.wordList}>{renderedWords}</div>
        </div>
    )
}

export default DynamicContentGame;
