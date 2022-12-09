import { combineReducers } from '@reduxjs/toolkit';
import authSlice from "./auth";
import reportSlice from "./report";


export const rootReducer = combineReducers({
	auth: authSlice,
	report: reportSlice,
});
