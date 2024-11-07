// app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const File = require('./models/File');

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Endpoint to Upload Multiple Files
app.post('/upload', upload.array('files', 10), async (req, res) => {
    try {
        const files = req.files;

        // Save file metadata to MongoDB
        const fileDocs = files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            contentType: file.mimetype,
            size: file.size,
            path: file.path
        }));
        
        await File.insertMany(fileDocs);

        res.status(200).json({ message: 'Files uploaded successfully', files: fileDocs });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Error uploading files' });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
