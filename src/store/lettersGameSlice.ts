import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IExamplePV} from "../models/IExamplePV";
import {fetchPVs} from "./actions/extApiActions";

interface LettersGameState {
    phrasalVerbs: IExamplePV[];
    receivedPVs: IExamplePV[];
    lastPV: IExamplePV | null;
    isLoading: boolean;
    error: string;
}

const initialState: LettersGameState = {
    phrasalVerbs: [
        {exampleId: 1584, exampleFull: "He HEATED the soup UP in the microwave.", exampleFullUnderscore: "He ______ the soup __ in the microwave.", exampleVerb: "HEATED", exampleParticle: "UP", meaning: "Make food hot.", verb: "Heat", verbAndParticle: "Heat up"},
        {exampleId: 2956, exampleFull: "We STAYED OUT all night.", exampleFullUnderscore: "We ______ ___ all night.", exampleVerb: "STAYED", exampleParticle: "OUT", meaning: "Not go home.", verb: "Stay", verbAndParticle: "Stay out"},
        {exampleId: 811, exampleFull: "I really had to DRILL DOWN to get the answers from the database.", exampleFullUnderscore: "I really had to _____ ____ to get the answers from the database.", exampleVerb: "DRILL", exampleParticle: "DOWN", meaning: "Search through layers of information on a computer.", verb: "Drill", verbAndParticle: "Drill down"},
    ],
    receivedPVs: [],
    lastPV: null,
    isLoading: false,
    error: '',
}

export const lettersGameSlice = createSlice({
    name: 'lettersGamePage',
    initialState,
    reducers: {
        addReceivedPV(state, action: PayloadAction<IExamplePV | null>) {
            //console.log(state);
            //console.log(action);
            if (action.payload) state.phrasalVerbs.push(action.payload);
        },
    },
    extraReducers: {
        [fetchPVs.fulfilled.type]: (state, action: PayloadAction<IExamplePV>) => {      // Сценарий успешной загрузки
            state.isLoading = false;
            state.error = '';
            state.lastPV = action.payload;
        },
        [fetchPVs.pending.type]: (state) => {                                           // Сценарий ожидания
            state.isLoading = true;
        },
        [fetchPVs.rejected.type]: (state, action: PayloadAction<string>) => {           // Сценарий когда произошла ошибка
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {addReceivedPV} = lettersGameSlice.actions;

export default lettersGameSlice.reducer;