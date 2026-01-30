const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
require('./config/db.config');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', require('./routes/'));

app.listen(8000, () => console.log("Server started on port 8000"));