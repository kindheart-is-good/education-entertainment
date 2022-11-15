const START_NEW_QUIZ_GAME = 'START_NEW_QUIZ_GAME';
const GIVE_FIRST_QUESTION = 'GIVE_FIRST_QUESTION';
const GET_PLAYER_STARTING_ACTIVITY = 'GET_PLAYER_STARTING_ACTIVITY';
const GET_PLAYER_ACTIVITY = 'GET_PLAYER_ACTIVITY';
const ANALYZE_USERS_ANSWER = 'ANALYZE_USERS_ANSWER';
const RESET_USER_SCORE = 'RESET_USER_SCORE';

let initialState = {
    questions: [
        {id: 0, questionText: 'Accept or follow a decision or rule.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Abide by', expUserChoseThisVariant: false, meaning: 'Accept or follow a decision or rule.', example: 'We have to ABIDE BY what the court says.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Square with', expUserChoseThisVariant: false, meaning: 'Check with someone that something is Ok.', example: 'I\'ll have to SQUARE that WITH my boss before I can confirm it.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Dial in', expUserChoseThisVariant: false, meaning: 'Join a teleconference.', example: 'They reported the meeting and people DIALLED IN to listen.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Cut through', expUserChoseThisVariant: false, meaning: 'Deal quickly with a complex issue that is causing trouble.', example: 'She CUT THROUGH the bureaucracy that was holding us up and got the deal done.'},
            ]},
        {id: 1, questionText: 'To explain.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Ache for', meaning: 'Want something or someone a lot.', example: 'My partner\'s been away for a fortnight  - I am ACHING FOR her.'},
                {variantNumber: 2, isVariantTrue: true, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 2, questionText: 'Want something or someone a lot.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 3, isVariantTrue: true, verbAndParticle: 'Ache for', meaning: 'Want something or someone a lot.', example: 'My partner\'s been away for a fortnight  - I am ACHING FOR her.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
            ]},
        {id: 3, questionText: 'To take action because of something like information received.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Abide by', meaning: 'Accept or follow a decision or rule.', example: 'We have to ABIDE BY what the court says.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 4, isVariantTrue: true, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 4, questionText: 'Perform something with actions and gestures.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Act upon', meaning: 'Affect.', example: 'The enzyme ACTS UPON certain proteins.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Act up', meaning: 'Behave badly or strangely.', example: 'My computer\'s ACTING UP; I think I might have a virus.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 5, questionText: 'Give out, distribute.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Fetch up', meaning: 'Arrive unintentionally.', example: 'The boat FETCHED UP on the beach.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Talk around', meaning: 'Persuade.', example: 'She TALKED them AROUND to accepting her point of view.'},
                {variantNumber: 3, isVariantTrue: true, verbAndParticle: 'Dole out', meaning: 'Give out, distribute.', example: 'They were DOLING OUT leaflets in front of the station.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Press on', meaning: 'Continue with something.', example: 'We PRESSED ON to get to our destination before night fell.'},
            ]},
        {id: 6, questionText: 'Amount to, be the most important aspect.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Come down to', meaning: 'Amount to, be the most important aspect.', example: 'It all COMES DOWN TO a question of who tries hardest.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Roll back', meaning: 'Retreat.', example: 'The army ROLLED BACK when they came under attack.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Stump up', meaning: 'Pay for something.', example: 'He didn\'t want to pay me back, but I got him to STUMP UP in the end.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Cover up', meaning: 'Conceal, try to stop people finding out.', example: 'They tried to COVER UP the incident but it got into the newspapers.'},
            ]},
        {id: 7, questionText: 'Make or persuade someone to accept something you don\'t want.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Reason out', meaning: 'Come to a conclusion or solution after some thought.', example: 'He REASONED OUT the answer to the math problem.'},
                {variantNumber: 2, isVariantTrue: true, verbAndParticle: 'Fob on', meaning: 'Make or persuade someone to accept something you don\'t want.', example: 'I FOBBED the work ON the others.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Reel in', meaning: 'Catch a fish on a line and pull the line to land.', example: 'He REELED IN a ten-pound salmon.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Take it upon', meaning: 'Take responsibility, often without consulting other people.', example: 'I TOOK IT UPON myself to make sure he got up on time.'},
            ]},
        {id: 8, questionText: 'Visit.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Come by', meaning: 'Visit.', example: 'I\'ll COME BY after work and see if you need any help.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Tag along', meaning: 'Accompany someone, especially if they haven\'t specifically invited you.', example: 'You\'re off to the cinema; can we TAG ALONG?'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Walk in on', meaning: 'Enter somewhere unexpectedly and see something.', example: 'He WALKED IN ON them planning to sack him.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Walk up', meaning: 'Go to someone.', example: 'A man WALKED UP and asked me the time.'},
            ]},
        {id: 9, questionText: 'Get rid of something.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Splash out', meaning: 'Spend a lot of money on something that is not essential.', example: 'We went to an expensive restaurant and SPLASHED OUT to celebrate'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Take through', meaning: 'Explain something to someone.', example: 'He TOOK me THROUGH the procedures before we started.'},
                {variantNumber: 3, isVariantTrue: true, verbAndParticle: 'Stamp out', meaning: 'Get rid of something.', example: 'The government has started a campaign to STAMP OUT drugs in schools.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Bring forth', meaning: 'Produce something, make it known or visible.', example: 'The prosecution BROUGHT FORTH a lot of evidence against him.'},
            ]},
        {id: 10, questionText: 'Dress smartly or improve the appearance of something.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Dwell on', meaning: 'Spend a lot of time on something.', example: '"The programme DWELLED ON little other than the scandal.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Lead on', meaning: 'Falsely or cruelly raise hopes.', example: 'She LED him ON about her desire to get married.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Drop out', meaning: 'Quit a course.', example: 'She DROPPED OUT of college and went straight into a good job.'},
                {variantNumber: 4, isVariantTrue: true, verbAndParticle: 'Gussy up', meaning: 'Dress smartly or improve the appearance of something.', example: 'They spent a fortune GUSSYING UP the house.'},
            ]},
        {id: 11, questionText: 'Persevere, not give up.', variants: [
                {variantNumber: 1, isVariantTrue: true, verbAndParticle: 'Hang in there', meaning: 'Persevere, not give up.', example: 'Were were doing badly, but we HUNG IN THERE till we finished.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Jack in', meaning: 'Quit, give up.', example: 'I JACKED my job IN because my boss refused to give me a raise.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Mug up', meaning: 'Study quickly, revise.', example: 'I have to MUG UP before the exam.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Fluff up', meaning: 'Shake or pat a cushion so that it fills with air.', example: 'He FLUFFED UP the pillow before going to bed.'},
            ]},
        {id: 12, questionText: 'Look in a place to try to find something.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Opt into', meaning: 'Choose to be a member or part of something.', example: 'I OPTED INTO the scheme.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Hover around', meaning: 'Move about a place.', example: 'She was HOVERING AROUND to see what we were talking about.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Wade through', meaning: 'Get to the end of something with difficulty.', example: 'It took me ages to WADE THROUGH the book.'},
                {variantNumber: 4, isVariantTrue: true, verbAndParticle: 'Root about', meaning: 'Look in a place to try to find something.', example: 'He ROOTED ABOUT in his briefcase, trying to find a pen.'},
            ]},
        {id: 13, questionText: 'Make something sticky.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Juice up', meaning: 'Make something more exciting or perform better.', example: 'I need to buy some memory to JUICE my computer UP.'},
                {variantNumber: 2, isVariantTrue: true, verbAndParticle: 'Clag up', meaning: 'Make something sticky.', example: 'His arteries are CLAGGED UP because he eats so much saturated fat.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Chime in', meaning: 'Contribute to a discussion.', example: 'If it\'s Ok, I\'d like to CHIME IN because I think it\'s a good idea.'},
                {variantNumber: 4, isVariantTrue: false, verbAndParticle: 'Stick up', meaning: 'Stand on end.', example: 'The static electricity made my hair STICK UP.'},
            ]},
        {id: 14, questionText: 'Add or attach something that wasn\'t planned to something.', variants: [
                {variantNumber: 1, isVariantTrue: false, verbAndParticle: 'Tone up', meaning: 'Make stronger or firmer.', example: 'The exercises will TONE UP your stomach muscles.'},
                {variantNumber: 2, isVariantTrue: false, verbAndParticle: 'Chance upon', meaning: 'Find something by accident.', example: 'I CHANCED UPON a very rare book in car boot sale and bought it for 65p.'},
                {variantNumber: 3, isVariantTrue: false, verbAndParticle: 'Ratchet up', meaning: 'Increase.', example: 'The media are trying to RATCHET UP the pressure on the person.'},
                {variantNumber: 4, isVariantTrue: true, verbAndParticle: 'Tack onto', meaning: 'Add or attach something that wasn\'t planned to something.', example: 'I TACKED a quick message ONTO the end of the letter after I\'d printed it.'},
            ]},
    ],
    isNewGameActivatorRun: false,
    numberOfQuestionsForGame: 3,
    /*isItNewQuestion: true,*/
    isWasFirstClickOnNewQuestion: false,
    currentQuestionNumber: 1,
    currentQuestion: {},
    userScore: 0,
    isUserStarted: false,
    usersLastChosenVariant: {},
    usersChosenVariants: [],
    isUserGuessedVariant: false,
    usersLastGuessedVariant: {},
    usersGuessedVariants: [],
    isGameFinished: false,
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

const quizReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_NEW_QUIZ_GAME:
            return {
                ...state,
                isNewGameActivatorRun: action.isNewGameActivatorRun,
                isGameFinished: false
            }

        case GIVE_FIRST_QUESTION:
            return {
                ...state,
                currentQuestion: state.questions[action.questionId]
            }

        case GET_PLAYER_STARTING_ACTIVITY:
            return {
                ...state,
                isUserStarted: true,
            }

        case GET_PLAYER_ACTIVITY:
            if (state.isUserGuessedVariant) {
                return {
                    ...state,
                    isItFirstClickOnNewQuestion: false,
                }
            }

        case ANALYZE_USERS_ANSWER:
        {
            if (!state.isGameFinished) {
                if (action.variant.isVariantTrue) {
                    if (state.currentQuestionNumber < state.numberOfQuestionsForGame) {
                        let giveNextQuestion = action.questionId + 1;   //TODO: подключить рандомизатор.
                        return {
                            ...state,
                            isUserStarted: false,
                            isItFirstClickOnNewQuestion: true,
                            isUserGuessedVariant: action.variant.isVariantTrue,
                            userScore: state.userScore + 10,
                            currentQuestionNumber: state.currentQuestionNumber+1,
                            currentQuestion: state.questions[giveNextQuestion],

                                        /* SAVE_LAST_GUESSED_VARIANT: */
                            usersLastChosenVariant: action.variant,
                            usersLastGuessedVariant: action.variant,

                                        /* SAVE_LAST_GUESSED_VARIANTS: */
                            usersChosenVariants: [...state.usersChosenVariants, action.variant],
                            /*usersGuessedVariants: [...state.usersGuessedVariants, {...state.usersLastGuessedVariant}],*/
                            usersGuessedVariants: [...state.usersGuessedVariants, action.variant],
                        }
                    }
                    return {
                        ...state,
                        isUserStarted: false,
                        isItFirstClickOnNewQuestion: true,
                        isUserGuessedVariant: action.variant.isVariantTrue,
                        userScore: state.userScore + 10,
                        currentQuestionNumber: state.currentQuestionNumber+1,
                        isGameFinished: true,
                        /*currentQuestion: state.questions[action.questionId],   // Правильно ли???*/

                                    /* SAVE_LAST_GUESSED_VARIANT: */
                        usersLastChosenVariant: action.variant,
                        usersLastGuessedVariant: action.variant,

                                    /* SAVE_LAST_GUESSED_VARIANTS: */
                        usersChosenVariants: [...state.usersChosenVariants, action.variant],
                        usersGuessedVariants: [...state.usersGuessedVariants, action.variant],
                    }
                } else {
                    return {
                        ...state,
                        isUserGuessedVariant: false,
                        isItFirstClickOnNewQuestion: true,
                        userScore: state.userScore - 5,

                                    /* SAVE_LAST_CHOSEN_VARIANT: */
                        usersLastChosenVariant: action.variant,

                                    /* SAVE_LAST_CHOSEN_VARIANTS: */
                        usersChosenVariants: [...state.usersChosenVariants, action.variant],
                    }
                }
            } else {
                return {
                    ...state,

                    /*isNewGameActivatorRun: false,
                    numberOfQuestionsForGame: 7,
                    currentQuestionNumber: 1,
                    currentQuestion: {},
                    userScore: 0,
                    isUserStarted: false,
                    usersLastChosenVariant: {},
                    usersChosenVariants: [],
                    isUserGuessedVariant: false,
                    usersLastGuessedVariant: {},
                    usersGuessedVariants: [],
                    isGameFinished: false,*/
                }
            }
        }

        case RESET_USER_SCORE:
            return {
                ...state,
                userScore: 0,
                isUserStarted: false,
                /*isItFirstClickOnNewQuestion: false,*/
                currentQuestionNumber: 1,
                usersLastChosenVariant: {},
                usersChosenVariants: [],
                isUserGuessedVariant: false,
                usersLastGuessedVariant: {},
                usersGuessedVariants: [],

                /*isNewGameActivatorRun: false,
                numberOfQuestionsForGame: 7,
                currentQuestion: {},
                isGameFinished: false,*/
            }

        default:
            return state;
    }
}

export const startNewQuizGame = (isNewGameActivatorRun) => ({type: START_NEW_QUIZ_GAME, isNewGameActivatorRun})
export const giveFirstQuestion = (questionId) => ({type: GIVE_FIRST_QUESTION, questionId})
export const getPlayerStartingActivity = () => ({type: GET_PLAYER_STARTING_ACTIVITY})
export const getPlayerActivity = () => ({type: GET_PLAYER_ACTIVITY})
export const analyzeUsersAnswer = (variant, questionId) => ({type: ANALYZE_USERS_ANSWER, variant, questionId})
export const resetUserScore = () => ({type: RESET_USER_SCORE})

export default quizReducer;