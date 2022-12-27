import {combineReducers, configureStore} from "@reduxjs/toolkit";
import quizReducer from './quizSlice';
import extApiReducer from "./extApiSlice";

const rootReducer = combineReducers({
    quizPage: quizReducer,
    extApiPage: extApiReducer,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']