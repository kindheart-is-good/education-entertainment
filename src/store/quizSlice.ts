import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPhrasalVerbQuestion, IPhrasalVerbVariant} from "../models/IPhrasalVerbQuestion";

interface QuizState {
    questions: IPhrasalVerbQuestion[];
    numberOfQuestionsForGame: number;
    currentQuestion: IPhrasalVerbQuestion | null;
    previousQuestions: IPhrasalVerbQuestion[];
    usersLastChosenVariant: IPhrasalVerbVariant | null;
    usersChosenVariants: IPhrasalVerbVariant[] | null;
    usersLastGuessedVariant: IPhrasalVerbVariant | null | {};
    usersGuessedVariants: IPhrasalVerbVariant[];
    usersWrongSelectedVariants: IPhrasalVerbVariant[];
}

const initialState: QuizState = {
    questions: [
        {id: 0, questionText: 'Accept or follow a decision or rule.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Abide by', meaning: 'Accept or follow a decision or rule.', example: 'We have to ABIDE BY what the court says.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Square with', meaning: 'Check with someone that something is Ok.', example: 'I\'ll have to SQUARE that WITH my boss before I can confirm it.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Dial in', meaning: 'Join a teleconference.', example: 'They reported the meeting and people DIALLED IN to listen.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Cut through', meaning: 'Deal quickly with a complex issue that is causing trouble.', example: 'She CUT THROUGH the bureaucracy that was holding us up and got the deal done.'},
            ]},
        {id: 1, questionText: 'To explain.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Ache for', meaning: 'Want something or someone a lot.', example: 'My partner\'s been away for a fortnight  - I am ACHING FOR her.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 2, questionText: 'Want something or someone a lot.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 3, isRightAnswer: true, verbAndParticle: 'Ache for', meaning: 'Want something or someone a lot.', example: 'My partner\'s been away for a fortnight  - I am ACHING FOR her.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
            ]},
        {id: 3, questionText: 'To take action because of something like information received.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Abide by', meaning: 'Accept or follow a decision or rule.', example: 'We have to ABIDE BY what the court says.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Account for', meaning: 'To explain.', example: 'They had to ACCOUNT FOR all the money that had gone missing.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 4, questionText: 'Perform something with actions and gestures.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Act out', meaning: 'Perform something with actions and gestures.', example: 'They ACTED OUT the story on stage.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Act upon', meaning: 'Affect.', example: 'The enzyme ACTS UPON certain proteins.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Act up', meaning: 'Behave badly or strangely.', example: 'My computer\'s ACTING UP; I think I might have a virus.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Act on', meaning: 'To take action because of something like information received.', example: 'The police were ACTING ON a tip from an informer and caught the gang red-handed.'},
            ]},
        {id: 5, questionText: 'Amount to, be the most important aspect.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Come down to', meaning: 'Amount to, be the most important aspect.', example: 'It all COMES DOWN TO a question of who tries hardest.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Roll back', meaning: 'Retreat.', example: 'The army ROLLED BACK when they came under attack.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Stump up', meaning: 'Pay for something.', example: 'He didn\'t want to pay me back, but I got him to STUMP UP in the end.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Cover up', meaning: 'Conceal, try to stop people finding out.', example: 'They tried to COVER UP the incident but it got into the newspapers.'},
            ]},
        {id: 6, questionText: 'Make or persuade someone to accept something you don\'t want.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Reason out', meaning: 'Come to a conclusion or solution after some thought.', example: 'He REASONED OUT the answer to the math problem.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Fob on', meaning: 'Make or persuade someone to accept something you don\'t want.', example: 'I FOBBED the work ON the others.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Reel in', meaning: 'Catch a fish on a line and pull the line to land.', example: 'He REELED IN a ten-pound salmon.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Take it upon', meaning: 'Take responsibility, often without consulting other people.', example: 'I TOOK IT UPON myself to make sure he got up on time.'},
            ]},
        {id: 7, questionText: 'Visit.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Come by', meaning: 'Visit.', example: 'I\'ll COME BY after work and see if you need any help.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Tag along', meaning: 'Accompany someone, especially if they haven\'t specifically invited you.', example: 'You\'re off to the cinema; can we TAG ALONG?'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Walk in on', meaning: 'Enter somewhere unexpectedly and see something.', example: 'He WALKED IN ON them planning to sack him.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Walk up', meaning: 'Go to someone.', example: 'A man WALKED UP and asked me the time.'},
            ]},
        {id: 8, questionText: 'Get rid of something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Splash out', meaning: 'Spend a lot of money on something that is not essential.', example: 'We went to an expensive restaurant and SPLASHED OUT to celebrate'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Take through', meaning: 'Explain something to someone.', example: 'He TOOK me THROUGH the procedures before we started.'},
                {variantNumber: 3, isRightAnswer: true, verbAndParticle: 'Stamp out', meaning: 'Get rid of something.', example: 'The government has started a campaign to STAMP OUT drugs in schools.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Bring forth', meaning: 'Produce something, make it known or visible.', example: 'The prosecution BROUGHT FORTH a lot of evidence against him.'},
            ]},
        {id: 9, questionText: 'Dress smartly or improve the appearance of something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Dwell on', meaning: 'Spend a lot of time on something.', example: '"The programme DWELLED ON little other than the scandal.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Lead on', meaning: 'Falsely or cruelly raise hopes.', example: 'She LED him ON about her desire to get married.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Drop out', meaning: 'Quit a course.', example: 'She DROPPED OUT of college and went straight into a good job.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Gussy up', meaning: 'Dress smartly or improve the appearance of something.', example: 'They spent a fortune GUSSYING UP the house.'},
            ]},
        {id: 10, questionText: 'Persevere, not give up.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Hang in there', meaning: 'Persevere, not give up.', example: 'Were were doing badly, but we HUNG IN THERE till we finished.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Jack in', meaning: 'Quit, give up.', example: 'I JACKED my job IN because my boss refused to give me a raise.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Mug up', meaning: 'Study quickly, revise.', example: 'I have to MUG UP before the exam.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Fetch up', meaning: 'Arrive unintentionally.', example: 'The boat FETCHED UP on the beach.'},
            ]},
        {id: 11, questionText: 'Look in a place to try to find something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Opt into', meaning: 'Choose to be a member or part of something.', example: 'I OPTED INTO the scheme.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Hover around', meaning: 'Move about a place.', example: 'She was HOVERING AROUND to see what we were talking about.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Wade through', meaning: 'Get to the end of something with difficulty.', example: 'It took me ages to WADE THROUGH the book.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Root about', meaning: 'Look in a place to try to find something.', example: 'He ROOTED ABOUT in his briefcase, trying to find a pen.'},
            ]},
        {id: 12, questionText: 'Become noticeable in something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Cruise through', meaning: 'Pass or succeed easily.', example: 'He CRUISED THROUGH the exam.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Cover for', meaning: 'Do someone\'s work while they are temporarily absent.', example: 'I COVERED FOR her while she was off sick.'},
                {variantNumber: 3, isRightAnswer: true, verbAndParticle: 'Creep into', meaning: 'Become noticeable in something.', example: 'An angry tone CREPT INTO her voice.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Count for', meaning: 'Be recognised as important, worthwhile or valuable.', example: 'Experience COUNTS FOR a lot in decision making.'},
            ]},
        {id: 13, questionText: 'Continue doing something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Get along with', meaning: 'Have a good relationship with someone.', example: 'I don\'t GET ALONG WITH my sister - we have nothing in common.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Get on', meaning: 'Continue doing something.', example: 'The teacher asked the pupils to GET ON with some work quietly as she had to leave the classroom.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Get into', meaning: 'Be accepted or admitted.', example: 'She did well and GOT INTO Cambridge University.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Get it on with', meaning: 'Have sex with.', example: 'Did you GET IT ON WITH him?'},
            ]},
        {id: 14, questionText: 'Start doing something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Set up', meaning: 'Prepare equipment, software, etc., for use.', example: 'The technician SET UP the computer network perfectly.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Set to', meaning: 'Work hard or enthusiastically.', example: 'If we all SET TO, we should be able to finish this in a few hours.'},
                {variantNumber: 3, isRightAnswer: true, verbAndParticle: 'Set about', meaning: 'Start doing something.', example: 'We SET ABOUT the cleaning and got it done before lunchtime.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Set in', meaning: 'Change season noticeably.', example: 'Winter has SET IN; it\'s started snowing.'},
            ]},
        {id: 15, questionText: 'Develop in a positive way.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Shape up', meaning: 'Develop in a positive way.', example: 'Things are SHAPING UP at work - everything\'s going well again.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Settle on', meaning: 'Agree.', example: 'They couldn\'t agree at first on a name for their daughter, but finally SETTLED ON Alice.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Share in', meaning: 'Have a part in a project, activity, etc.', example: 'A number of firms will SHARE IN the development.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Stem from', meaning: 'Originate, be caused by.', example: 'The trouble STEMS FROM their refusal to discuss the matter.'},
            ]},
        {id: 16, questionText: 'Mention.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Tag on', meaning: 'Add an additional point to something written or spoken.', example: 'He TAGGED ON a few comments after reading my report.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Touch upon', meaning: 'Mention.', example: 'They didn\'t TOUCH UPON the subject because of the controversy.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Talk through', meaning: 'Guide someone through an issue.', example: 'The teacher TALKED me THROUGH the test so I knew what to expect.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Tick along', meaning: 'Make reasonable progress without any serious problems.', example: 'Things are TICKING ALONG at work while the director\'s away.'},
            ]},
        {id: 17, questionText: 'Raise a child.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Take up', meaning: 'Start a new hobby, pastime, etc..', example: 'He TOOK UP squash as he felt he had to lose some weight.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Weigh up', meaning: 'Assess.', example: 'They WEIGHED the pros and cons UP carefully before deciding.'},
                {variantNumber: 3, isRightAnswer: true, verbAndParticle: 'Bring up', meaning: 'Raise a child.', example: 'My parents BROUGHT me UP strictly.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Set on', meaning: 'Attack.', example: 'He was SET ON when he left the bar.'},
            ]},
        {id: 18, questionText: 'Discuss.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Word up', meaning: 'Give someone information, advice.', example: 'The solicitor WORDED her UP client before the police interview, so they go very little out of him.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Talk over', meaning: 'Discuss.', example: 'TALK OVER problems, don\'t bottle them up inside.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Speak up', meaning: 'Talk more loudly.', example: 'They couldn\'t hear the speaker and asked him to SPEAK UP a bit.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Be on about', meaning: 'Mean, try to say.', example: 'I could understand what he WAS ON ABOUT.'},
            ]},
        {id: 19, questionText: 'Like.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Be into', meaning: 'Like.', example: 'I AM INTO classical music.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Be up to', meaning: 'Be good enough.', example: 'He IS not UP TO the job; get someone else.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Be in on', meaning: 'Be involved in.', example: 'Susan was the only one who WAS not IN ON the plan.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Be up for', meaning: 'Be enthusiastic about an upcoming event.', example: 'ARE you UP FOR the climb of Mt. Blanc?'},
            ]},
        {id: 20, questionText: 'Provide someone with everything they need or want.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Wait up', meaning: 'Stop (imperative).', example: 'WAIT UP! I need to talk to you.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Wait about', meaning: 'Wait somewhere doing nothing.', example: 'I WAITED ABOUT for an hour, but they didn\'t come.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Wait out', meaning: 'Wait till something has finished, usually something unpleasant.', example: 'We\'ll have to WAIT OUT this uncertainty.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Wait on', meaning: 'Provide someone with everything they need or want.', example: 'When he was a child his parents WAITS ON him with all their love.'},
            ]},
        {id: 21, questionText: 'Become.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Turn in', meaning: 'Hand in, submit.', example: 'She TURNED IN her paper.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Turn into', meaning: 'Become.', example: 'Tadpoles TURN INTO frogs.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Turn up', meaning: 'Appear.', example: 'She didn\'t TURN UP for class today.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Turn to', meaning: 'Try to get help.', example: 'She had nobody to TURN TO when her husband died.'},
            ]},
        {id: 22, questionText: 'Just get enough to succeed, pass or be accepted.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Scrape by', meaning: 'Just manage to pass something.', example: 'I thought I was going to fail, but SCRAPED BY with 51%.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Scrape along', meaning: 'Manage with little money.', example: 'I\'ve been SCRAPING ALONG on temporary work since I lost my job.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Scrape into', meaning: 'Be accepted somewhere, but only just.', example: 'She got mediocre grades and just SCRAPED INTO university.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Scrape in', meaning: 'Just get enough to succeed, pass or be accepted.', example: 'The government SCRAPED IN with 51% of the votes cast.'},
            ]},
        {id: 23, questionText: 'Add or attach something that wasn\'t planned to something.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Tone up', meaning: 'Make stronger or firmer.', example: 'The exercises will TONE UP your stomach muscles.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Chance upon', meaning: 'Find something by accident.', example: 'I CHANCED UPON a very rare book in car boot sale and bought it for 65p.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Ratchet up', meaning: 'Increase.', example: 'The media are trying to RATCHET UP the pressure on the person.'},
                {variantNumber: 4, isRightAnswer: true, verbAndParticle: 'Tack onto', meaning: 'Add or attach something that wasn\'t planned to something.', example: 'I TACKED a quick message ONTO the end of the letter after I\'d printed it.'},
            ]},
        {id: 24, questionText: 'Relax, do nothing.', variants: [
                {variantNumber: 1, isRightAnswer: true, verbAndParticle: 'Veg out', meaning: 'Relax, do nothing.', example: 'I\'m going to VEG OUT in front of the televisor tonight.'},
                {variantNumber: 2, isRightAnswer: false, verbAndParticle: 'Fluff up', meaning: 'Shake or pat a cushion so that it fills with air.', example: 'He FLUFFED UP the pillow before going to bed.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Dole out', meaning: 'Give out, distribute.', example: 'They were DOLING OUT leaflets in front of the station.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Vamp up', meaning: 'Make something more exciting, attractive, etc.', example: 'The place is dull and you need to VAMP it UP.'},
            ]},
        {id: 25, questionText: 'Make something sticky.', variants: [
                {variantNumber: 1, isRightAnswer: false, verbAndParticle: 'Juice up', meaning: 'Make something more exciting or perform better.', example: 'I need to buy some memory to JUICE my computer UP.'},
                {variantNumber: 2, isRightAnswer: true, verbAndParticle: 'Clag up', meaning: 'Make something sticky.', example: 'His arteries are CLAGGED UP because he eats so much saturated fat.'},
                {variantNumber: 3, isRightAnswer: false, verbAndParticle: 'Chime in', meaning: 'Contribute to a discussion.', example: 'If it\'s Ok, I\'d like to CHIME IN because I think it\'s a good idea.'},
                {variantNumber: 4, isRightAnswer: false, verbAndParticle: 'Stick up', meaning: 'Stand on end.', example: 'The static electricity made my hair STICK UP.'},
            ]},
    ],
    numberOfQuestionsForGame: 5,
    currentQuestion: null,
    previousQuestions: [],
    usersLastChosenVariant: null,
    usersChosenVariants: [],
    usersLastGuessedVariant: {},
    usersGuessedVariants: [],
    usersWrongSelectedVariants: [],
}

export const quizSlice = createSlice({
    name: 'quizPage',
    initialState,
    reducers: {
        setNewQuestion(state, action: PayloadAction<number>) {
            state.currentQuestion = state.questions[action.payload];
        },
        analyzeRightUsersAnswer(state, action: PayloadAction<IPhrasalVerbVariant>) {
            // console.log(`@QS analyzeRightUsersAnswer:
            //        \n~ state = ${state},
            //        \n~ action = ${action.payload.verbAndParticle}`);
            state.usersLastChosenVariant = action.payload;
            state.usersLastGuessedVariant = action.payload;
            state.usersChosenVariants?.push(action.payload);
            /*state.usersGuessedVariants: [...state.usersGuessedVariants, {...state.usersLastGuessedVariant}];*/
            state.usersGuessedVariants.push(action.payload);
            state.usersWrongSelectedVariants = [];
        },
        analyzeWrongUsersAnswer(state, action: PayloadAction<IPhrasalVerbVariant>) {
            // console.log(`@QS analyzeWrongUsersAnswer:
            //        \n~ state = ${state},
            //        \n~ action = ${action.payload.verbAndParticle}`);
            state.usersLastChosenVariant = action.payload;
            state.usersChosenVariants?.push(action.payload);
            state.usersWrongSelectedVariants.push(action.payload);
        },
        savePrevQuestions(state, action: PayloadAction<IPhrasalVerbQuestion>) {
            // console.log(`@QS savePrevQuestions:
            //        \n~ state = ${state},
            //        \n~ action = ${action.payload.questionText}`);
            state.previousQuestions.push(action.payload);
        },
        resetUserActivity(state) {
            //state.previousQuestions = [];
            state.previousQuestions.length = 0;
            state.usersLastChosenVariant = null;
            state.usersChosenVariants = [];
            state.usersLastGuessedVariant = {};
            state.usersGuessedVariants = [];
            state.usersWrongSelectedVariants = [];
        },
    },

});

// деструктуризируем поле actions которое получаем из Slice и в фигурных скобках указываем какие поля мы хотим получить.
export const {setNewQuestion, analyzeRightUsersAnswer, analyzeWrongUsersAnswer,
    resetUserActivity, savePrevQuestions} = quizSlice.actions;

export default quizSlice.reducer;