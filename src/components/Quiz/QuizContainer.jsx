import React from "react";
import Quiz from "./Quiz";
import {
    startNewQuizGame,
    giveFirstQuestion,
    userStartedActivity,
    analyzeUsersAnswer,
    resetUserScore,
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
                  userStartedActivity={this.props.userStartedActivity}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        /*questions: state.quizPage.questions,*/
        isNewGameActivatorRun: state.quizPage.isNewGameActivatorRun,
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        currentQuestionId: state.quizPage.currentQuestionId,
        currentQuestion: state.quizPage.currentQuestion,
        userScore: state.quizPage.userScore,
        isUserStarted: state.quizPage.isUserStarted,
        usersLastChosenVariant: state.quizPage.usersLastChosenVariant,
        isUserGuessedVariant: state.quizPage.isUserGuessedVariant,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        isGameFinished: state.quizPage.isGameFinished,
    }
}

export default connect(
    mapStateToProps,
    {startNewQuizGame, giveFirstQuestion, userStartedActivity, analyzeUsersAnswer, resetUserScore}
)(QuizContainer);