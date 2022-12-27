import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";
import {extApiSlice} from "../extApiSlice";
import {IExamplePV} from "../../models/IExamplePV";

export const fetchPVs = createAsyncThunk(
    'pv/fetchRandomExampleDetails',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IExamplePV>('https://localhost:44321/api/Example/GetRandomExampleDetails');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить Phrasal Verb")
        }
    }
)
