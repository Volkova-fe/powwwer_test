import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import { authReducer } from "./auth";
import { reportReducer } from "./report";

export const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['report']
}


export const rootReducer = combineReducers({
	auth: authReducer,
	report: reportReducer,
});
