const express = require('express');
app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./App/routes/authRouter');
const enquiry_router = require('./App/routes/enquiry_routes');
const subscribeRouter = require('./App/routes/subscribeRouter');
require('dotenv').config();
const connectDB = require('./App/config/db');
const PORT = process.env.PORT || 1001;

connectDB();

// Define allowed origins
const allowedOrigins = [
    'http://localhost:5173', // Local development
    process.env.FRONTEND_URL   // Deployed frontend URL from environment variables
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/enquiry', enquiry_router);
app.use('/api', subscribeRouter);

app.get('/', (req, res) => {
    res.send('Welcome to MockT API');
});

const serverless = require('serverless-http');
module.exports = app;
module.exports.handler = serverless(app);


// http://localhost:1001/home