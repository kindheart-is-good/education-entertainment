import React from "react";
import Quiz from "./Quiz";
import {
    startNewQuizGame,
    giveFirstQuestion,
    analyzeUsersAnswer,
    resetUserScore
} from "../../redux/quiz-reducer";
import {connect} from "react-redux";

class QuizContainer extends React.Component {

    // componentDidMount() { }

    render() {
        return (
            <Quiz {...this.props}
                  startNewQuizGame={this.props.startNewQuizGame}
                  giveFirstQuestion={this.props.giveFirstQuestion}
                  analyzeUsersAnswer={this.props.analyzeUsersAnswer}
                  resetUserScore={this.props.resetUserScore}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        /*questions: state.quizPage.questions,*/
        isNewQuizGameStarted: state.quizPage.isNewQuizGameStarted,
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        currentQuestionId: state.quizPage.currentQuestionId,
        currentQuestion: state.quizPage.currentQuestion,
        userScore: state.quizPage.userScore,
        isUserGuessedVariant: state.quizPage.isUserGuessedVariant,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        isGameFinished: state.quizPage.isGameFinished,
    }
}

export default connect(
    mapStateToProps,
    {startNewQuizGame, giveFirstQuestion, analyzeUsersAnswer, resetUserScore}
)(QuizContainer);