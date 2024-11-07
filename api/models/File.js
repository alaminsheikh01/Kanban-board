// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    contentType: String,
    size: Number,
    path: String,
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('File', fileSchema);
