import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
}

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
//save data in local storage
const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer, enhancer)
export let persistor = persistStore(store)

