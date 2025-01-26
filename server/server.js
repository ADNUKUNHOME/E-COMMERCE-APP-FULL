const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth/auth-routes')

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.log(error));

const App = express();
const PORT = process.env.PORT || 5000;


App.use(
    cors({
        origin: 'http://localhost:5173',
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

App.listen(PORT, () => console.log('Server is running on the port 5000'));