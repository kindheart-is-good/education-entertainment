import React from "react";
import {connect} from "react-redux";
import {
    setNewQuestion,
    analyzeRightUsersAnswer,
    analyzeWrongUsersAnswer,
    resetUserActivity,
} from "../../redux/quiz-reducer";
import Quiz from "./Quiz";

class QuizContainer extends React.Component {

    // componentDidMount() { }

    render() {
        return (
            <Quiz {...this.props}
                  setNewQuestion={this.props.setNewQuestion}
                  analyzeRightUsersAnswer={this.props.analyzeRightUsersAnswer}
                  analyzeWrongUsersAnswer={this.props.analyzeWrongUsersAnswer}
                  resetUserActivity={this.props.resetUserActivity}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        /*questions: state.quizPage.questions,*/
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        currentQuestion: state.quizPage.currentQuestion,
        usersLastChosenVariant: state.quizPage.usersLastChosenVariant,
        usersChosenVariants: state.quizPage.usersChosenVariants,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        usersWrongSelectedVariants: state.quizPage.usersWrongSelectedVariants,
    }
}

export default connect(
    mapStateToProps,
    {setNewQuestion, analyzeRightUsersAnswer, analyzeWrongUsersAnswer, resetUserActivity}
)(QuizContainer);