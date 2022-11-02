import React from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";

class Quiz extends React.Component {

    state = {
        isUserChoose: false,
        currentQuestionId: 0,
    }

    activateNext = () => {
        this.setState({
            isUserChoose: true,
            //currentQuestionId: this.state.currentQuestionId+1
        })
    }

    deactivateNext() {
        this.setState({
            isUserChoose: false
        })
    }

    increaseQuestionId() {
        if (this.state.currentQuestionId < this.props.numberOfQuestionsForGame) {
            // this.state.currentQuestionId++;
            this.setState({
                currentQuestionId: this.state.currentQuestionId+1
            })
        }
    }

    /*questionElements = this.props.questions
        .map(q => <div key={q.id}>
            <div>
                { this.state.isUserChoose
                    ? <div>
                        <QuizQuestion questionText={q.questionText}
                                      id={q.id} />
                    </div>
                    : <div>
                        text
                    </div>}
            </div>
        </div>)*/

    /*variantElements = this.props.questions[this.state.currentQuestionId].variants
        .map(v => <div key={v.id}>
            <button onClick={ ()=>{this.checkVariant(v)} } >
                { v.verbAndParticle }
            </button>
        </div>)*/

    getVariantsForQuestion(question) {
        return question.variants
            .map(v => <div key={v.id}>
                <button onClick={ ()=>{this.checkVariant(v)} } >
                    { v.verbAndParticle }
                </button>
            </div>)
    }

    checkVariant = (v) => {
        //alert(this.state.isUserChoose);
        console.log(this.state.isUserChoose);

        if (v.isVariantTrue) {
            this.activateNext();
            this.increaseQuestionId();
            this.props.saveLastGuessedVariant(v);
            this.props.saveAllGuessedVariants(v);
            this.props.checkUsersAnswer(v.isVariantTrue);
        }
        else {
            this.deactivateNext();
        }

        //alert(this.state.isUserChoose);
        console.log(this.state.isUserChoose);
        console.log(this.state.currentQuestionId);
    }

    render() {
        return (
            <div className={styles.content}>

                {/*{ this.questionElements }*/}
                <QuizQuestion questionText={this.props.questions[this.state.currentQuestionId].questionText}
                              id={this.props.questions[this.state.currentQuestionId].id} />

                {/*{ this.variantElements }*/}
                { this.getVariantsForQuestion(this.props.questions[this.state.currentQuestionId]) }

                {/*{ this.props.qs
                    .map(extractedQuestion =>
                        <div key={extractedQuestion.id}>
                            { extractedQuestion.questionText }
                            <textarea value={extractedQuestion.questionText} onChange={()=>{}}></textarea>
                        </div>)
                }*/}

                {/* DEBUG: */}
                <div style={{ padding: "20px", color: "indianred" }}>
                    DEBUG, last guessed variant:
                    <p>{this.props.usersLastGuessedVariant.verbAndParticle}</p>
                </div>
            </div>
        )
    }
}

export default Quiz;