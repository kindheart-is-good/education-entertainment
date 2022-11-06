import {combineReducers, legacy_createStore} from "redux";
import quizReducer from "./quiz-reducer";

let reducers = combineReducers({
    quizPage: quizReducer
});

let store = legacy_createStore(reducers);

/*  Для дебага из консоли браузера. Сохраняем ссылку на наш объект store в глобальный объект.   */
/*  Пример: store.getState().quizPage.isUserGuessedVariant    */
window.store = store;

export default store;