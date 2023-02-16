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
            exampleId: 2416,
            exampleFull: "WORD UP! You Ok?",
            exampleFullUnderscore: "____ __! You Ok?",
            exampleVerb: "WORD",
            exampleParticle: "UP",
            meaning: "A phrase that was used a greeting.",
            verb: "Word",
            verbAndParticle: "Word up"
        },
        {
            exampleId: 236,
            exampleFull: "After so much criticism, the positive review BUOYED him UP.",
            exampleFullUnderscore: "After so much criticism, the positive review ______ him __.",
            exampleVerb: "BUOYED",
            exampleParticle: "UP",
            meaning: "Make someone feel more positive.",
            verb: "Buoy",
            verbAndParticle: "Buoy up"
        },
        {
            exampleId: 1957,
            exampleFull: "The secrecy SPEAKS TO the importance of the documents.",
            exampleFullUnderscore: "The secrecy ______ __ the importance of the documents.",
            exampleVerb: "SPEAKS",
            exampleParticle: "TO",
            meaning: "Comment, make a statement.",
            verb: "Speak",
            verbAndParticle: "Speak to"
        },
        {
            exampleId: 1811,
            exampleFull: "Things are SHAPING UP at work - everything's going well again.",
            exampleFullUnderscore: "Things are _______ __ at work - everything's going well again.",
            exampleVerb: "SHAPING",
            exampleParticle: "UP",
            meaning: "Develop in a positive way.",
            verb: "Shape",
            verbAndParticle: "Shape up"
        }
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
        addReceivedExample(state, action: PayloadAction<IExamplePV | null>) {
            //console.log(state);
            //console.log(action);
            if (action.payload) state.phrasalVerbs.push(action.payload);
        },
        firstExampleWhenStart(state) {
            state.currentExample = state.phrasalVerbs[0];
        }
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

export const {addReceivedExample, firstExampleWhenStart} = lettersGameSlice.actions;

export default lettersGameSlice.reducer;
