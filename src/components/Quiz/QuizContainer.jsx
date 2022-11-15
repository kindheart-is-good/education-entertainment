import React from "react";
import Quiz from "./Quiz";
import {
    startNewQuizGame,
    giveFirstQuestion,
    getPlayerStartingActivity,
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
                  getPlayerStartingActivity={this.props.getPlayerStartingActivity}
                  analyzeUsersAnswer={this.props.analyzeUsersAnswer}
                  resetUserScore={this.props.resetUserScore}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        /*questions: state.quizPage.questions,*/
        isNewGameActivatorRun: state.quizPage.isNewGameActivatorRun,
        numberOfQuestionsForGame: state.quizPage.numberOfQuestionsForGame,
        currentQuestionNumber: state.quizPage.currentQuestionNumber,
        currentQuestion: state.quizPage.currentQuestion,
        userScore: state.quizPage.userScore,
        isUserStarted: state.quizPage.isUserStarted,
        /*isWasFirstClickOnNewQuestion: state.quizPage.isWasFirstClickOnNewQuestion,*/
        usersLastChosenVariant: state.quizPage.usersLastChosenVariant,
        usersChosenVariants: state.quizPage.usersChosenVariants,
        isUserGuessedVariant: state.quizPage.isUserGuessedVariant,
        usersLastGuessedVariant: state.quizPage.usersLastGuessedVariant,
        usersGuessedVariants: state.quizPage.usersGuessedVariants,
        isGameFinished: state.quizPage.isGameFinished,
    }
}

export default connect(
    mapStateToProps,
    {startNewQuizGame, giveFirstQuestion, getPlayerStartingActivity, analyzeUsersAnswer, resetUserScore}
)(QuizContainer);