import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage

const persistConfig = {
    key: 'auth',   // The key under which the data will be stored in localStorage
    storage,       // Defines where the data is stored (localStorage by default)
    whitelist: ['isAuthenticated', 'user'] // Only persist auth-related data
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for Redux Persist
        }),
});

export const persistor = persistStore(store); // Persistor to be used in App.js

export default store;
