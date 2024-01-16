const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    CustomerName: {
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    ProfilePicture: {
        required: true,
        type: String
    }
})

const userSchema = mongoose.model('Strugbits-Test', schema);
module.exports = userSchema