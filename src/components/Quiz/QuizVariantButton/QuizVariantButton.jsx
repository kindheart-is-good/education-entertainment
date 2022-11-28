import React from "react";
import styles from "./QuizVariantButton.module.css";

const QuizVariantButton = (props) => {

    const onChangeColor = (variant) => {

        let arr = props.usersWrongSelectedVariants;

        /*if (isUserGuess) {*/
        /*if (props.isItNewQuestion) {*/
        /*if (props.isItNewQuestion && arr.length === 0) {*/
        if (arr.length === 0) {
            document.getElementById("button1").style.backgroundColor='white';
            document.getElementById("button2").style.backgroundColor='white';
            document.getElementById("button3").style.backgroundColor='white';
            document.getElementById("button4").style.backgroundColor='white';
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].verbAndParticle !== variant.verbAndParticle) {
                    document.getElementById("button" + props.v.variantNumber).style.backgroundColor = '#e2754e';
                    /*document.querySelector('.variantButton').onClick = function () {
                        this.style.backgroundColor = '#e2754e';
                    }*/
                }
                else {
                    document.getElementById("button" + props.v.variantNumber).style.backgroundColor = '#e3fd00';
                }
            }
        }
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

    return (
        <button className={styles.variantButton}
                id={"button"+props.v.variantNumber}
                /*disabled={onDisabled()}*/
                onClick={() => {
                    /*onChangeColor(props.v);*/
                    props.analyzeUsersAnswer(props.v);
                }}>
            {props.v.verbAndParticle}
        </button>
    )
}

export default QuizVariantButton;