// const express = require('express');
// const passport = require('passport');
// const { 
//     dashboardPage, loginPage, checkLogin, logout, profilePage, 
// } = require('../controllers/admin.controller');

// const route = express.Router();

// // --- Auth & Login ---
// route.get('/', passport.checkAuthIsNotDone, loginPage);
// route.post('/login', passport.authenticate('localAuth', { failureRedirect: '/' }), checkLogin);
// route.get('/logout', passport.checkAuthIsDone, logout);

// // --- Dashboard & Profile ---
// route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);
// route.get('/profile', passport.checkAuthIsDone, profilePage);

// // --- Modular Routes ---
// // Removed checkAuthIsDone from here because it's handled inside admin.route or via index.js top routes
// route.use('/admin', passport.checkAuthIsDone, require('./admin.route')); 
// route.use('/category', passport.checkAuthIsDone, require("./category.route"));

// module.exports = route;


const express = require('express');
const passport = require('passport');
const { 
    dashboardPage, loginPage, checkLogin, logout, profilePage 
} = require('../controllers/admin.controller');

const route = express.Router();

route.get('/', passport.checkAuthIsNotDone, loginPage);
route.post('/login', passport.authenticate('localAuth', { failureRedirect: '/' }), checkLogin);
route.get('/logout', passport.checkAuthIsDone, logout);

route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);
route.get('/profile', passport.checkAuthIsDone, profilePage);

route.use('/admin',  require('./admin.route')); 
route.use('/category', passport.checkAuthIsDone, require("./category.route"));

module.exports = route;