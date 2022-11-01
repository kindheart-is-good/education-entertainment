import React from "react";
import Quiz from "./Quiz";
import {saveLastGuessedVariant, saveAllGuessedVariants, checkUsersAnswer} from "../../redux/content-reducer";
import {connect} from "react-redux";

class QuizContainer extends React.Component {

    // localState = {
    //     qsFromLocalState: [],
    // }

    getQuestionsAlternativeTry() {
        let qs = [];
        for (let i=0; i < this.props.numberOfQuestionsForGame; i++) {
            if (this.props.isUserGuessedVariant) {
                qs.push(this.props.questions[i]);
                this.props.checkUsersAnswer(false);
            }
        }
        return qs;
    }

    // componentDidMount() {
    //     this.localState.qsFromLocalState = this.getQuestionsAlternativeTry();
    // }

    render() {
        return (
            <Quiz {...this.props}
                  saveLastGuessedVariant={this.props.saveLastGuessedVariant}
                  saveAllGuessedVariants={this.props.saveAllGuessedVariants}
                  checkUsersAnswer={this.props.checkUsersAnswer}
                  //qs={this.localState.qsFromLocalState}
                  qs={this.getQuestionsAlternativeTry()}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        questions: state.quizPage.questions,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        isUserGuessedVariant: state.quizPage.isUserGuessedVariant,
    }
}

export default connect(
    mapStateToProps, {saveLastGuessedVariant, saveAllGuessedVariants, checkUsersAnswer}
)(QuizContainer);