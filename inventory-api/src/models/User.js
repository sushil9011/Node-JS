const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    create_at: { type: String },
    update_at: { type: String }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);