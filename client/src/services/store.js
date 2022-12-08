
import { rootReducer } from './slices/index';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';


export const store = configureStore({
	reducer: rootReducer,
	enhancers: [applyMiddleware(thunk)],
	devTools: process.env.NODE_ENV !== 'production',
});
