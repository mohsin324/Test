require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URI;

const connection = mongoose.connect(mongoURL, {
    useNewUrlParser: false
})

module.exports = connection