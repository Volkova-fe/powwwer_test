import { combineReducers } from '@reduxjs/toolkit';
import { reportAPI } from '../reportServices';
import authSlice from "./auth";
import reportSlice from "./report";


export const rootReducer = combineReducers({
	auth: authSlice,
	report: reportSlice,
	[reportAPI.reducerPath]: reportAPI.reducer,
});
