import React from 'react';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';


const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);