import React, {useState} from "react";
import styles from "./WordShow.module.css";
import bird from '../../../assets/images/animals-svg/bird.svg';
import cat from '../../../assets/images/animals-svg/cat.svg';
import cow from '../../../assets/images/animals-svg/cow.svg';
import dog from '../../../assets/images/animals-svg/dog.svg';
import gator from '../../../assets/images/animals-svg/gator.svg';
import horse from '../../../assets/images/animals-svg/horse.svg';
import heart from '../../../assets/images/animals-svg/heart.svg';

const svgMap = {
    /* ФИЧА JAVASCRIPT:
    bird: bird,
    эту запись JS позволяет записать и в специальном сокрещенном виде: (просто одно слово)
    bird
     */
    bird, cat, cow, dog, gator, horse
}

const WordShow = ({ type }) => {

    const [clicks, setClicks] = useState(0)

    const handleClick = () => {
        setClicks(clicks + 1)
    }

    return (
        <div className={styles.wordShow} onClick={handleClick}>
            <img className={styles.word} alt="animal" src={svgMap[type]} />
            <img
                className={styles.heart}
                alt="heart"
                src={heart}
                style={{ width: 10 + 10 * clicks + 'px' }}
            />
        </div>
    )
}

export default WordShow;
