
import { rootReducer } from './slices/index';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { reportAPI } from './reportServices';


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reportAPI.middleware),
	enhancers: [applyMiddleware(thunk)],
	devTools: process.env.NODE_ENV !== 'production',
});
