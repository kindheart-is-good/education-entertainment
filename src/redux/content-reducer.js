const CHOOSE_VARIANT = 'CHOOSE-VARIANT';
const CLICK_VARIANT = 'CLICK-VARIANT';
const UPDATE_USER_SCORE = 'UPDATE-USER-SCORE';

let initialState = {
    questions: [
        {id: 0, questionText: 'Accept or follow a decision or rule.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by', isUserChooseVariant: false },
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for', isUserChooseVariant: false},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ache for', isUserChooseVariant: false},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on', isUserChooseVariant: false},
            ]},
        {id: 1, questionText: 'To explain.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ache for'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on'},
            ]},
        {id: 2, questionText: 'Want something or someone a lot.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ache for'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on'},
            ]},
        {id: 3, questionText: 'To take action because of something like information received.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ache for'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on'},
            ]},
    ],
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
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Wassup'}
    ],
    newMessageBody: "",
    chosenByUser: ""
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {

        case CHOOSE_VARIANT:
            return {
                ...state,
                questions: [...state.questions],
                //variants:
            }


        case CLICK_VARIANT:
            return {
                ...state,
                questions: [...state.questions],
                variants: state.questions[0].variants.map (v => {
                    if (v.variantNumber === action.variantId) {
                        if (v.isVariantTrue === true) {
                            return {...v, isUserChooseVariant: true}
                        }
                        // else {
                        //     return {...v, verbAndParticle: "No"}
                        // }
                        //return {...v}
                    }
                    return v
                })
            }

        case UPDATE_USER_SCORE:
            return {
                ...state,
                questions: [...state.questions],

            }

        default:
            return state;
    }
}

//export const choseVariantAC = () => ({type: CHOOSE_VARIANT})
export const choseVariantAC = (variantId) => ({type: CLICK_VARIANT, variantId})
export const updateUserScoreAC = (variantId) => ({type: UPDATE_USER_SCORE, variantId: variantId})

export default contentReducer;