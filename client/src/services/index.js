import { combineReducers } from '@reduxjs/toolkit';
import { authAPI } from './authServices';
import { reportAPI } from './reportServices';
import authSlice from "./feature/authSlice";



export const rootReducer = combineReducers({
	auth: authSlice,
	[reportAPI.reducerPath]: reportAPI.reducer,
	[authAPI.reducerPath]: authAPI.reducer,
});
