const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRoutes = require('./routes/admin/admin-routes');
const adminOrdersRoutes = require('./routes/admin/order-routes');

const commonFeatureRoutes = require('./routes/admin/feature-routes');

const shopProductsRouter = require('./routes/shop/product-routes');
const shopCartsRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');
const shopReviewRouter = require('./routes/shop/review-routes');

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.log(error));

const App = express();
const PORT = process.env.PORT || 5000;


App.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);

App.use(cookieparser());
App.use(express.json());
App.use('/api/auth', authRouter);
App.use('/api/admin/products', adminProductsRoutes)
App.use('/api/admin/orders', adminOrdersRoutes)

App.use('/api/shope/products', shopProductsRouter)
App.use('/api/shope/cart', shopCartsRouter)
App.use('/api/shope/address', shopAddressRouter);
App.use('/api/shope/order', shopOrderRouter);
App.use('/api/shope', shopSearchRouter);
App.use('/api/shope/review', shopReviewRouter);

App.use('/api/common/feature', commonFeatureRoutes);

App.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));