import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // NOTE: Only for dev purpose
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: devMode, // NOTE: Only for dev purpose
    middleware
    // preloadedState
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// const _state = {
//   "profile": {
//     "collapseProfileHeader": true,
//     "details": {
//       "name": "Isabela Reinket",
//       "profilePic": "/img/profile1.png"
//     },
//     "services": [
//       {
//         "id": 1,
//         "name": "Lectura del tarot"
//       },
//       {
//         "id": 2,
//         "name": "Sesion personalizada"
//       },
//       {
//         "id": 3,
//         "name": "Analisis astrologico"
//       }
//     ]
//   }
// };

const store = createStore();

export default store;