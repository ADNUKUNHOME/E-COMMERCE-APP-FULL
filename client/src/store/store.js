import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminProductsSlice from './admin/products-slice'
import shopeProductsSlice from './shope/products-slice'

const persistConfig = {
    key: 'auth',  
    storage,      
    whitelist: ['isAuthenticated', 'user']
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedReducer,
        adminProducts: AdminProductsSlice,
        shopeProducts: shopeProductsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for Redux Persist
        }),
});

export const persistor = persistStore(store); // Persistor to be used in App.js

export default store;
