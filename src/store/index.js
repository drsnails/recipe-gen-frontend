import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { recipeReducer } from "./reducers/recipeReducer";
import { userReducer } from "./reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    recipeModule: recipeReducer,
    userModule: userReducer
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.myStore = store
