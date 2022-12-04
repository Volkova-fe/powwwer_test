import React from 'react';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
}



const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
const enhancer = composeEnhancers(applyMiddleware(thunk));

const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer, enhancer)
export let persistor = persistStore(store)

