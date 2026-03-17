const express = require('express');
const app = express();
const allRoutes = require('./routes/index');

app.use(express.json());


app.use('/api', allRoutes);

module.exports = app;