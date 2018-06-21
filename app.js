const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const hotelRoute = require('./routes/hotelRoute');
const roomRoute = require('./routes/roomRoute');
const bookingRoute = require('./routes/bookingRoute');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/room', roomRoute);
app.use('/api/booking', bookingRoute);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});