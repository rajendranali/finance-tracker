import { applyMiddleware, combineReducers, createStore } from "redux";
import { rootReducer } from "./reducer/rootReducer";
import { thunk } from "redux-thunk";

const rootRedurcerCombine = combineReducers({
    transactions: rootReducer,
  });
export const store=createStore(rootRedurcerCombine,applyMiddleware(thunk))