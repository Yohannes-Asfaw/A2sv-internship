const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./dbconnection');
const endpoints = require('./endpoints');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase();

// Use endpoints
app.use('/', endpoints);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
