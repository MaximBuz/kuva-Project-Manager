import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

const persistConfig = {
    key: 'root',
    storage,
}
// Note: Blacklist tasks from persisting

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store)