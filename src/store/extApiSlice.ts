import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {IExamplePV} from "../models/IExamplePV";
import {fetchPVs} from "./actions/extApiActions";

export const fetchPVfromServer = createAsyncThunk(
    'pv/fetchExample',
    async (_, thunkAPI) => {
        try {
            //const response = await axios.get<IExamplePV[]>('http://localhost:3001/phrasalVerb');
            const response = await axios.get<IExamplePV>('https://api:7001/api/Example/GetRandomExampleDetails');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить посты")
        }
    }
)

interface ExtApiState {
    phrasalVerbs: IExamplePV[];
    receivedPVs: IExamplePV[];
    pvFromJsonServer: IExamplePV | null,
    lastPV: IExamplePV | null;
    isLoading: boolean;
    error: string;
}

const initialState: ExtApiState = {
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
    receivedPVs: [],
    pvFromJsonServer: null,
    lastPV: null,
    isLoading: false,
    error: '',
}

export const extApiSlice = createSlice({
    name: 'extApiPage',
    initialState,
    reducers: {
        addReceivedPV(state, action: PayloadAction<IExamplePV | null>) {
            //console.log(state);
            //console.log(action);
            if (action.payload) state.receivedPVs.push(action.payload);
        },
    },
    extraReducers: {
        [fetchPVs.pending.type]: (state) => {                                                    // Сценарий ожидания
            //state.isLoading = true;
        },
        [fetchPVs.fulfilled.type]: (state, action: PayloadAction<IExamplePV>) => {               // Сценарий успешной загрузки
            //state.isLoading = false;
            //state.error = '';
            state.lastPV = action.payload;
            addReceivedPV(action.payload);
        },
        [fetchPVs.rejected.type]: (state, action: PayloadAction<string>) => {                    // Сценарий когда произошла ошибка
            //state.isLoading = false;
            //state.error = action.payload;
        },
        [fetchPVfromServer.pending.type]: (state) => {                                           // Сценарий ожидания
            state.isLoading = true;
        },
        [fetchPVfromServer.fulfilled.type]: (state, action: PayloadAction<IExamplePV>) => {      // Сценарий успешной загрузки
            state.isLoading = false;
            state.error = '';
            state.pvFromJsonServer = action.payload;
        },
        [fetchPVfromServer.rejected.type]: (state, action: PayloadAction<string>) => {           // Сценарий когда произошла ошибка
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {addReceivedPV} = extApiSlice.actions;

export default extApiSlice.reducer;
