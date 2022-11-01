import React from "react";
import styles from "./Quiz.module.css"
import QuizQuestion from "./QuizQuestion/QuizQuestion";

class Quiz extends React.Component {

    state = {
        isUserChoose: false
    }

    activateNext = () => {
        this.setState({
            isUserChoose: true
        })
    }

    deactivateNext() {
        this.setState({
            isUserChoose: false
        })
    }

    variantElements = this.props.questions[0].variants
        .map(v => <div key={v.id}>
            <button onClick={ ()=>{this.checkVariant(v)} } >
                { v.verbAndParticle }
            </button>
        </div>)

    checkVariant = (v) => {
        //alert(this.state.isUserChoose);
        console.log(this.state.isUserChoose);

        if (v.isVariantTrue) {
            this.activateNext();
            this.props.saveLastGuessedVariant(v);
            this.props.saveAllGuessedVariants(v);
            this.props.checkUsersAnswer(v.isVariantTrue);
        }
        else {
            this.deactivateNext();
        }

        //alert(this.state.isUserChoose);
        console.log(this.state.isUserChoose);
    }

    questionElements = this.props.questions
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
        </div>)

    render() {
        return (
            <div className={styles.content}>
                {/*<QuizQuestion questionText={this.props.questions[0].questionText}
                              id={this.props.questions[0].id} />*/}
                { this.questionElements }
                { this.variantElements }
                { this.props.qs
                    .map(extractedQuestion =>
                        <div key={extractedQuestion.id}>
                            { extractedQuestion.questionText }
                            <textarea value={extractedQuestion.questionText} onChange={()=>{}}></textarea>
                        </div>)
                }
                <textarea value={this.props.usersLastGuessedVariant.verbAndParticle} onChange={()=>{}}></textarea>
            </div>
        )
    }
}

export default Quiz;