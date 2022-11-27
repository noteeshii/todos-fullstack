require('dotenv').config();
const express = require('express');
const router = require('./routes/api.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware.js');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api',router);
app.use(ErrorMiddleware);

const start = async () => {
    try {
        app.listen(PORT,() => {
            console.log('Server start on port ' + PORT)
        });
    } catch (e) {
        console.log(e);
    }
};

start();