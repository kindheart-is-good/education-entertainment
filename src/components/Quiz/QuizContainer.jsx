import React from "react";
import Quiz from "./Quiz";
import {
    startNewQuizGame,
    giveFirstQuestion,
    analyzeUsersAnswer
} from "../../redux/content-reducer";
import {connect} from "react-redux";

class QuizContainer extends React.Component {

    // componentDidMount() { }

    render() {
        return (
            <Quiz {...this.props}
                  analyzeUsersAnswer={this.props.analyzeUsersAnswer}
                  giveFirstQuestion={this.props.giveFirstQuestion}
                  startNewQuizGame={this.props.startNewQuizGame}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        questions: state.quizPage.questions,
        isNewQuizGameStarted: state.quizPage.isNewQuizGameStarted,
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        currentQuestionId: state.quizPage.currentQuestionId,
        currentQuestion: state.quizPage.currentQuestion,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        isUserGuessedVariant: state.quizPage.isUserGuessedVariant,
    }
}

export default connect(
    mapStateToProps,
    {startNewQuizGame, giveFirstQuestion, analyzeUsersAnswer}
)(QuizContainer);