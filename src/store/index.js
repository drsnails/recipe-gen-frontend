import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { dialogMsgReducer } from "./reducers/dialogMsgReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { recipeReducer } from "./reducers/recipeReducer";
import { userReducer } from "./reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    recipeModule: recipeReducer,
    userModule: userReducer,
    dialogMsgModule: dialogMsgReducer,
    loaderModule: loaderReducer
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.myStore = store
