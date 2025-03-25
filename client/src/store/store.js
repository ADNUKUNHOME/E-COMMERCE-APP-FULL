import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminProductsSlice from './admin/products-slice'
import AdminOrdersSlice from './admin/order-slice'

import shopeProductsSlice from './shope/products-slice'
import shopeCartSlice from './shope/cart-slice'
import shopeAddressSlice from './shope/address-slice'
import shopeOrderSlice from './shope/order-slice'
import shopeSearchSlice from './shope/search-slice'

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
        adminOrders: AdminOrdersSlice,
        
        shopeProducts: shopeProductsSlice,
        shopeCart: shopeCartSlice,
        shopeAddress: shopeAddressSlice,
        shopeOrder: shopeOrderSlice,
        shopeSearch: shopeSearchSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for Redux Persist
        }),
});

export const persistor = persistStore(store); // Persistor to be used in App.js

export default store;
