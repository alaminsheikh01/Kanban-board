const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://alameendev:vBmP3YtM9gtpuNio@cluster0.otqin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
