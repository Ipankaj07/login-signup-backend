const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pincode: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('User', userSchema);