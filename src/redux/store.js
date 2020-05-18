import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // NOTE: Only for dev purpose
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  storage
}

const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: devMode, // NOTE: Only for dev purpose
    middleware
    // preloadedState
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = createStore();
const persistor = persistStore(store);

export { persistor };

export default store;