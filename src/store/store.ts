import {combineReducers, configureStore} from "@reduxjs/toolkit";
import quizReducer from './quizSlice'

const rootReducer = combineReducers({
    quizPage: quizReducer,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']