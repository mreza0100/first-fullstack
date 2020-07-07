import { combineReducers } from "redux";
import todos from "./todos";

const combinedReducer = combineReducers({ todos });

export default combinedReducer;
