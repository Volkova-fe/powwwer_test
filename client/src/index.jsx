import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './vendors/normalize.module.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </Provider>
    </BrowserRouter>
);
