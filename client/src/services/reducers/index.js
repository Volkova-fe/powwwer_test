import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { reportReducer } from "./report";


export const rootReducer = combineReducers({
	auth: authReducer,
	report: reportReducer,
});