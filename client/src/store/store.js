import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AdminProductsSlice from './admin/products-slice'
import AdminOrdersSlice from './admin/order-slice'
import CommonFeatureSlice from './admin/feature-slice'

import shopeProductsSlice from './shope/products-slice'
import shopeCartSlice from './shope/cart-slice'
import shopeAddressSlice from './shope/address-slice'
import shopeOrderSlice from './shope/order-slice'
import shopeSearchSlice from './shope/search-slice'
import shopeReviewSlice from './shope/review-slice'

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
        commonFeature: CommonFeatureSlice,
        
        shopeProducts: shopeProductsSlice,
        shopeCart: shopeCartSlice,
        shopeAddress: shopeAddressSlice,
        shopeOrder: shopeOrderSlice,
        shopeSearch: shopeSearchSlice,
        shopeReview: shopeReviewSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);

export default store;
