import React from "react";
import Quiz from "./Quiz";
import {choseVariantAC, updateUserScoreAC} from "../../redux/content-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        questions: state.quizPage.questions
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        userChoose: (variantId) => {
            dispatch(choseVariantAC(variantId));
        },
        updateUserScore: (variantId) => {
            dispatch(updateUserScoreAC(variantId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);