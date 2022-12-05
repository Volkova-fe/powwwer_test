import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from "./auth";
import { reportReducer } from "./report";

export const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['auth']
}

const authPersistConfig = {
	key: 'auth',
	storage: storage,
	blacklist: ['report']
}

export const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	report: reportReducer,
});
