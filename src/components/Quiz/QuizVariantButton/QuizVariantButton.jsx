import React, {useState} from "react";
import styles from "./QuizVariantButton.module.css"

const QuizVariantButton = (props) => {

    let [isUserGuess, setUsersGuess] = useState(false);

    let onNewQuestion = () => {
        if (props.isUserGuessedVariant) {
            setUsersGuess(true);

            setTimeout(() => {
                setUsersGuess(false);
            }, 1000)
        }
    }

    let onChangeColor = (variant, variantNumber, currentQuestionId) => {

        /*if (props.isUserGuessedVariant) {
            setUsersGuess(true);

            setTimeout(() => {
                setUsersGuess(false);
            }, 1)
        }*/

        /*if (props.isItNewQuestion) {
            setUsersGuess(true);
        }*/



        let arr = props.usersWrongSelectedVariants;

        if (props.isItNewQuestion && arr.length === 0) {
        /*if (props.isItNewQuestion) {*/
        /*if (isUserGuess) {*/
            document.getElementById("button1").style.backgroundColor='white';
            document.getElementById("button2").style.backgroundColor='white';
            document.getElementById("button3").style.backgroundColor='white';
            document.getElementById("button4").style.backgroundColor='white';
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                /*if (arr[i].verbAndParticle === props.v.verbAndParticle) {
                    document.getElementById("button" + props.variantNumber).style.backgroundColor = '#e2754e';
                    /!*document.querySelector('.variantButton').onClick = function () {
                        this.style.backgroundColor = '#e2754e';
                    }*!/
                }*/
                if (arr[i].verbAndParticle !== variant.verbAndParticle) {
                    document.getElementById("button" + props.variantNumber).style.backgroundColor = '#e2754e';
                    /*document.querySelector('.variantButton').onClick = function () {
                        this.style.backgroundColor = '#e2754e';
                    }*/
                }
                else {
                    document.getElementById("button" + props.variantNumber).style.backgroundColor = '#e3fd00';
                }
            }
        }

        /*setUsersGuess(false);*/
    }

    const onDisabled = () => {
        let arr = props.usersWrongSelectedVariants;

        if (arr.length !== 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].verbAndParticle === props.v.verbAndParticle) {
                    return true;
                }
            }
        }
        else {
            return false
        }
    }

    const buttonStyles = {
        /*color: props.isUserGuessedVariant*/
        /*color: props.isItNewQuestion*/
        color: isUserGuess
            ? 'white'
            : props.isUserGuessedVariant
                ? 'red'
                : 'yellow'
    }

    return (
        <button className={styles.variantButton} id={"button"+props.variantNumber} style={buttonStyles}
                disabled={onDisabled()}
                onClick={() => {
                    props.setClickCounter(props.clickCounter + 1);
                    props.analyzeUsersAnswer(props.v, props.currentQuestionId);
                    props.getPlayerStartingActivity();
                    onNewQuestion();
                    onChangeColor(props.v, props.variantNumber, props.currentQuestionId);
                    props.setNewLevel();
                }}>
            {props.verbAndParticle}
        </button>
    )
}

export default QuizVariantButton;