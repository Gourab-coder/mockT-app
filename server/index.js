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
app.use(cors({
    origin: 'http://localhost:5173', // frontend's origin
    credentials: true
}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/enquiry', enquiry_router);
app.use('/api', subscribeRouter);

app.get('/home', (req, res) => {
    res.send('Welcome to MockT API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// http://localhost:1001/home