import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { rootPersistConfig, rootReducer } from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
//save data in local storage
let persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export let store = createStore(persistedReducer, enhancer)
export let persistor = persistStore(store)

