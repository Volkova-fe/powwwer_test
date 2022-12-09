import { combineReducers } from '@reduxjs/toolkit';
import authSlice from "./auth";
import reportSlice from "./report";
import trackSlice from "./track";


export const rootReducer = combineReducers({
	auth: authSlice,
	report: reportSlice,
	track: trackSlice,
});
