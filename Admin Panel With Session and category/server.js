const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
require('./config/db.config');

// --- NEW ADDITIONS START ---
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { setFlash } = require('./middleware/connectFlash.middleware');
const passportConfig = require('./middleware/passport.local.middleware'); 
// --- NEW ADDITIONS END ---

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// --- SESSION SETUP (Must be before Routes) ---
app.use(session({
    name: 'adminPanel',
    secret: 'mysecretkey', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } 
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);
app.use(setFlash);
// --- END SESSION SETUP ---

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', require('./routes/'));

app.listen(8000, () => console.log("Server started on port 8000"));