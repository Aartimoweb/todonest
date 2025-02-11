import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './userslice';
import authReducer from './authReducer';





const persistConfig = {
  key: 'root', 
  storage, 
  // whitelist: ['user', 'auth'], 
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
