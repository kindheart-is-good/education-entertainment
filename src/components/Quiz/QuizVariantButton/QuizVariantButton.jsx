import React from "react";
import styles from "./QuizVariantButton.module.css"

const QuizVariantButton = (props) => {

    let onChangeColor = (variant, variantNumber, currentQuestionId) => {
        /*if (props.isWasFirstClickOnNewQuestion)
        {
            document.getElementById("button"+props.variantNumber).style.backgroundColor='white';
        }
        else
        {
            if (variant.isVariantTrue) {
                document.getElementById("button"+props.variantNumber).style.backgroundColor='#e3fd00';
                /!*document.querySelector('.variantButton').onClick = function () {
                    this.style.backgroundColor = '#e3fd00';
                }*!/
            }
            else {
                document.getElementById("button"+props.variantNumber).style.backgroundColor='#e2754e';
            }
        }*/

        /*if (variant.isVariantTrue) {
            document.getElementById("button"+props.variantNumber).style.backgroundColor='#e3fd00';
            /!*document.querySelector('.variantButton').onClick = function () {
                this.style.backgroundColor = '#e3fd00';
            }*!/
        }
        else {
            document.getElementById("button"+props.variantNumber).style.backgroundColor='#e2754e';
        }*/
    }

    return (
        <button className={styles.variantButton} id={"button"+props.variantNumber}
            /*disabled={props.followingInProgress.some(id => id === u.id)}*/
            /*disabled={!props.v.isVariantTrue}*/
                    onClick={() => {
                        props.analyzeUsersAnswer(props.v, props.currentQuestionId);
                        props.getPlayerStartingActivity();
                        /*props.getPlayerActivity();*/
                        onChangeColor(props.v, props.variantNumber, props.currentQuestionId);
                    }}>
            {props.verbAndParticle}
        </button>
    )
}

export default QuizVariantButton;