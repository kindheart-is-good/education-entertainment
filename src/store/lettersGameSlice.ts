import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {IExamplePV} from "../models/IExamplePV";

/*
export const fetchExample = createAsyncThunk(
    'phrasalVerbs/fetchExample',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IExamplePV[]>(process.env.REACT_APP_API_URL2 + '/phrasalVerbs/1');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить посты")
        }
    }
)
*/

export const fetchExample = createAsyncThunk(
    'phrasalVerbs/fetchExample',
    async (exampleId: number, thunkAPI) => {
        try {
            const response = await axios.get<IExamplePV[]>(process.env.REACT_APP_API_URL2 + `/phrasalVerbs/${exampleId}`);
            /*const response = await axios.get<IExamplePV>(process.env.REACT_APP_API_URL + `/api/Example/GetRandomExampleDetails`);*/
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить посты")
        }
    }
)

interface LettersGameState {
    phrasalVerbs: IExamplePV[];
    receivedExamples: IExamplePV[];
    currentExample: IExamplePV | null;
    isLoading: boolean;
    error: string;
}

const initialState: LettersGameState = {
    phrasalVerbs: [
        {
            //exampleId: 1786,
            exampleId: 1,
            exampleFull: "We SET ABOUT the cleaning and got it done before lunchtime.",
            exampleFullUnderscore: "We ___ _____ the cleaning and got it done before lunchtime.",
            exampleVerb: "SET",
            exampleParticle: "ABOUT",
            meaning: "Start doing something.",
            verb: "Set",
            verbAndParticle: "Set about"
        },
        {
            //exampleId: 236,
            exampleId: 2,
            exampleFull: "After so much criticism, the positive review BUOYED him UP.",
            exampleFullUnderscore: "After so much criticism, the positive review ______ him __.",
            exampleVerb: "BUOYED",
            exampleParticle: "UP",
            meaning: "Make someone feel more positive.",
            verb: "Buoy",
            verbAndParticle: "Buoy up"
        },
        {
            //exampleId: 1957,
            exampleId: 3,
            exampleFull: "The secrecy SPEAKS TO the importance of the documents.",
            exampleFullUnderscore: "The secrecy ______ __ the importance of the documents.",
            exampleVerb: "SPEAKS",
            exampleParticle: "TO",
            meaning: "Comment, make a statement.",
            verb: "Speak",
            verbAndParticle: "Speak to"
        },
        {
            //exampleId: 1811,
            exampleId: 4,
            exampleFull: "Things are SHAPING UP at work - everything's going well again.",
            exampleFullUnderscore: "Things are _______ __ at work - everything's going well again.",
            exampleVerb: "SHAPING",
            exampleParticle: "UP",
            meaning: "Develop in a positive way.",
            verb: "Shape",
            verbAndParticle: "Shape up"
        },
        {
            //exampleId: 1374,
            exampleId: 5,
            exampleFull: "She hates to OPEN UP and discuss her feelings.",
            exampleFullUnderscore: "She hates to ____ __ and discuss her feelings.",
            exampleVerb: "OPEN",
            exampleParticle: "UP",
            meaning: "Start to talk freely about something.",
            verb: "Open",
            verbAndParticle: "Open up"
        },
        {
            //exampleId: 2416,
            exampleId: 6,
            exampleFull: "WORD UP! You Ok?",
            exampleFullUnderscore: "____ __! You Ok?",
            exampleVerb: "WORD",
            exampleParticle: "UP",
            meaning: "A phrase that was used a greeting.",
            verb: "Word",
            verbAndParticle: "Word up"
        },
        {
            //exampleId: 161,
            exampleId: 7,
            exampleFull: "They BOUNCED ideas OFF each other in a brainstorming session.",
            exampleFullUnderscore: "They _______ ideas ___ each other in a brainstorming session.",
            exampleVerb: "BOUNCED",
            exampleParticle: "OFF",
            meaning: "Test ideas.",
            verb: "Bounce",
            verbAndParticle: "Bounce off"
        },
        {
            //exampleId: 1100,
            exampleId: 8,
            exampleFull: "I need to buy some memory to JUICE my computer UP.",
            exampleFullUnderscore: "I need to buy some memory to _____ my computer __.",
            exampleVerb: "JUICE",
            exampleParticle: "UP",
            meaning: "Make something more exciting or perform better.",
            verb: "Juice",
            verbAndParticle: "Juice up"
        },
        {
            //exampleId: 1115,
            exampleId: 9,
            exampleFull: "He KEPT ON trying and succeeded in the end.",
            exampleFullUnderscore: "He ____ __ trying and succeeded in the end.",
            exampleVerb: "KEPT",
            exampleParticle: "ON",
            meaning: "Continue doing something.",
            verb: "Keep",
            verbAndParticle: "Keep on"
        },
        {
            //exampleId: 313,
            exampleId: 10,
            exampleFull: "They were CHATTING AWAY within minutes of meeting.",
            exampleFullUnderscore: "They were ________ ____ within minutes of meeting.",
            exampleVerb: "CHATTING",
            exampleParticle: "AWAY",
            meaning: "Talk in a free and friendly manner.",
            verb: "Chat",
            verbAndParticle: "Chat away"
        },
    ],
    receivedExamples: [],
    currentExample: null,
    isLoading: false,
    error: '',
}

export const lettersGameSlice = createSlice({
    name: 'lettersGamePage',
    initialState,
    reducers: {
        // setNewQuestion - ВРЕМЕННО ДОБАВИЛ
        setNewExample(state, action: PayloadAction<number>) {
            state.currentExample = state.phrasalVerbs[action.payload];
        },
        firstExampleWhenStart(state) {
            state.currentExample = state.phrasalVerbs[2];
        },
        addReceivedExample(state, action: PayloadAction<IExamplePV | null>) {
            //console.log(state);
            //console.log(action);
            if (action.payload) state.phrasalVerbs.push(action.payload);
        },
    },
    extraReducers: {
        [fetchExample.pending.type]: (state) => {                                           // Сценарий ожидания
            state.isLoading = true;
        },
        [fetchExample.fulfilled.type]: (state, action: PayloadAction<IExamplePV>) => {      // Сценарий успешной загрузки
            state.isLoading = false;
            state.error = '';
            state.currentExample = action.payload;
        },
        [fetchExample.rejected.type]: (state, action: PayloadAction<string>) => {           // Сценарий когда произошла ошибка
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {addReceivedExample, firstExampleWhenStart, setNewExample} = lettersGameSlice.actions;

export default lettersGameSlice.reducer;
