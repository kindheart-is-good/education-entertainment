const ANALYZE_USERS_ANSWER = 'ANALYZE_USERS_ANSWER';
const GIVE_FIRST_QUESTION = 'GIVE_FIRST_QUESTION';
const START_NEW_QUIZ_GAME = 'START_NEW_QUIZ_GAME';

let initialState = {
    questions: [
        {id: 0, questionText: 'Accept or follow a decision or rule.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by', expUserChoseThisVariant: false },
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for', expUserChoseThisVariant: false},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ache for', expUserChoseThisVariant: false},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on', expUserChoseThisVariant: false},
            ]},
        {id: 1, questionText: 'To explain.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Ache for'},
                {variantNumber: 2, isVariantTrue: true, verbAndParticle: 'Account for'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Act out'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on'},
            ]},
        {id: 2, questionText: 'Want something or someone a lot.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Act on'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Act out'},
                {variantNumber: 3, isVariantTrue: true, verbAndParticle: 'Ache for'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Account for'},
            ]},
        {id: 3, questionText: 'To take action because of something like information received.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Abide by'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Act out'},
                {variantNumber: 4, isVariantTrue: true, verbAndParticle: 'Act on'},
            ]},
    ],
    isNewQuizGameStarted: false,
    numberOfQuestionsForGame: 3,
    currentQuestionId: 0,
    currentQuestion: {},
    usersGuessedVariants: [],
    usersLastGuessedVariant: {},
    isUserGuessedVariant: false,
    phrasalVerbs: [
        {id: 0, letter: 'A', Verb: 'Abide', VerbAndParticle: 'Abide by', Meaning: 'Accept or follow a decision or rule.', Example: 'We have to ABIDE BY what the court says.', CuttedExample: 'We have to _____ __ what the court says.', ExtractedVerb: 'ABIDE', ExtractedParticles: 'BY'},
        {id: 1, letter: 'A', Verb: 'Account', VerbAndParticle: 'Account for', Meaning: 'To explain.', Example: 'They had to ACCOUNT FOR all the money that had gone missing.', CuttedExample: 'They had to _______ ___ all the money that had gone missing.', ExtractedVerb: 'ACCOUNT', ExtractedParticles: 'FOR'},
        {id: 2, letter: 'A', Verb: 'Ache', VerbAndParticle: 'Ache for', Meaning: 'Want something or someone a lot.', Example: 'My partner\'s been away for a fortnight - I am ACHING FOR her.', CuttedExample: 'My partner\'s been away for a fortnight  - I am ______ ___ her.', ExtractedVerb: 'ACHING', ExtractedParticles: 'FOR'},
        {id: 3, letter: 'A', Verb: 'Act', VerbAndParticle: 'Act on', MeaningAndExample: [
                {Meaning: 'To take action because of something like information received.', Example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.', CuttedExample: 'The police were ______ __ a tip from an informer and caught the gang red-handed.', ExtractedVerb: 'ACTING', ExtractedParticles: 'ON'},
                {Meaning: 'Affect.', Example: 'The medicine only ACTS ON infected tissue.', CuttedExample: 'The medicine only ____ __ infected tissue.', ExtractedVerb: 'ACTS', ExtractedParticles: 'ON'}
            ]},
        {id: 4, letter: 'A', Verb: 'Act', VerbAndParticle: 'Act out', MeaningAndExample: [
                {Meaning: 'Perform something with actions and gestures.', Example: 'They ACTED OUT the story on stage.', CuttedExample: 'They _____ ___ the story on stage.', ExtractedVerb: 'ACTED', ExtractedParticles: 'OUT'},
                {Meaning: 'Express an emotion in your behaviour.', Example: 'Their anger is ACTED OUT in their antisocial behaviour.', CuttedExample: 'Their anger is _____ ___ in their antisocial behaviour.', ExtractedVerb: 'ACTED', ExtractedParticles: 'OUT'}
            ]},
    ],
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {

        case ANALYZE_USERS_ANSWER:
        {
            if (action.variant.isVariantTrue)
            {
                if (action.questionId < state.numberOfQuestionsForGame) {
                    let giveNextQuestion = action.questionId+1;
                    return {
                        ...state,
                        isUserGuessedVariant: action.isVariantTrue,
                        currentQuestion: state.questions[giveNextQuestion],

                            /* SAVE_LAST_GUESSED_VARIANT: */
                        usersLastGuessedVariant: action.variant,

                            /* SAVE_LAST_GUESSED_VARIANT: */
                        usersGuessedVariants: [...state.usersGuessedVariants, {...state.usersLastGuessedVariant}],
                    }
                }
                return {
                    ...state,
                    isUserGuessedVariant: action.isVariantTrue,
                    currentQuestion: state.questions[action.questionId],    // Правильно ли???

                        /* SAVE_LAST_GUESSED_VARIANT: */
                    usersLastGuessedVariant: action.variant,

                        /* SAVE_LAST_GUESSED_VARIANT: */
                    usersGuessedVariants: [...state.usersGuessedVariants, {...state.usersLastGuessedVariant}],
                }
            }
            else
            {
                return {
                    ...state,
                    isUserGuessedVariant: false,
                }
            }
        }

        case GIVE_FIRST_QUESTION:
            return {
                ...state,
                currentQuestion: state.questions[action.questionId]
            }

        case START_NEW_QUIZ_GAME:
            return {
                ...state,
                isNewQuizGameStarted: action.isNewQuizGameStarted,
            }

        default:
            return state;
    }
}

export const analyzeUsersAnswer = (variant, questionId) => ({type: ANALYZE_USERS_ANSWER, variant, questionId})
export const giveFirstQuestion = (questionId) => ({type: GIVE_FIRST_QUESTION, questionId})
export const startNewQuizGame = (isNewQuizGameStarted) => ({type: START_NEW_QUIZ_GAME, isNewQuizGameStarted})

export default contentReducer;