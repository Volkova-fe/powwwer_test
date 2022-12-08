import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from "./auth";
import reportSlice from "./report";
import trackSlice from "./track";


export const rootReducer = combineReducers({
	auth: authReducer,
	report: reportSlice,
	track: trackSlice,
});
