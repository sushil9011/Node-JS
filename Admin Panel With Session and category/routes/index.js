

const express = require('express');
const passport = require('passport');
const { dashboardPage, loginPage, checkLogin, logout, profilePage } = require('../controllers/admin.controller');

const route = express.Router(); // Variable name is 'route'

route.get('/', passport.checkAuthIsNotDone, loginPage);
route.post('/login', (req, res, next) => {
    passport.authenticate('localAuth', (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            // Check karein ki 'info' exist karta hai ya nahi
            let msg = 'Invalid Credentials';
            if (info && info.message) {
                msg = info.message;
            }
            return res.redirect('/?error=' + encodeURIComponent(msg));
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return checkLogin(req, res, next);
        });
    })(req, res, next);
});
route.get('/logout', passport.checkAuthIsDone, logout);
route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);
route.get('/profile', passport.checkAuthIsDone, profilePage);

route.use('/admin', require('./admin.route'));
route.use('/category', passport.checkAuthIsDone, require("./category.route"));
route.use('/subcategory', require('./subcategory.route'));

// Is line ko check karein, variable 'route' hi hona chahiye
route.use('/extracategory', require('./extraCategory.route'));

route.use('/product', require('./product.route'));

module.exports = route;