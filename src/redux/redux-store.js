import {combineReducers, legacy_createStore} from "redux";
import contentReducer from "./content-reducer";

let reducers = combineReducers({
    quizPage: contentReducer
});

let store = legacy_createStore(reducers);

/*  Для дебага из консоли браузера. Сохраняем ссылку на наш объект store в глобальный объект.   */
/*  Пример: store.getState().quizPage.isUserGuessedVariant    */
window.store = store;

export default store;