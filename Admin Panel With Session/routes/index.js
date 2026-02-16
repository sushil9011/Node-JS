const express = require('express');
const passport = require('passport');
const upload = require('../middleware/multer.middleware');
const { 
    dashboardPage, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, 
    editAdminPage, updateAdmin, loginPage, checkLogin, logout, 
    changePasswordPage, changePassword, profilePage, verifyEmail, 
    OTPPage, OTPVerify, newPasswordPage, changeNewPassword 
} = require('../controllers/admin.controller');

const route = express.Router();

// --- Auth & Login ---
route.get('/', passport.checkAuthIsNotDone, loginPage);
route.post('/login', passport.authenticate('localAuth', { failureRedirect: '/' }), checkLogin);
route.get('/logout', passport.checkAuthIsDone, logout);

// --- Dashboard & Profile ---
route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);
route.get('/profile', passport.checkAuthIsDone, profilePage);

// --- Password Management ---
route.get('/change-password', passport.checkAuthIsDone, changePasswordPage);
route.post('/change-password', passport.checkAuthIsDone, changePassword);
route.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);
route.get('/otp-page', passport.checkAuthIsNotDone, OTPPage);
route.post('/otp-verify', passport.checkAuthIsNotDone, OTPVerify);
route.get('/newPasswordPage', passport.checkAuthIsNotDone, newPasswordPage);
route.post('/change-new-password', passport.checkAuthIsNotDone, changeNewPassword);

// --- Admin Management (CRUD) ---
route.get('/addAdminPage', passport.checkAuthIsDone, addAdminPage);
route.post('/insertAdmin', passport.checkAuthIsDone, upload.single('profile_image'), insertAdmin);
route.get('/viewAdminPage', passport.checkAuthIsDone, viewAdminPage);
route.get('/deleteAdmin', passport.checkAuthIsDone, deleteAdmin);
route.get('/editAdmin/:adminId', passport.checkAuthIsDone, editAdminPage);
route.post('/editAdmin/:adminId', passport.checkAuthIsDone, upload.single('profile_image'), updateAdmin);

// Category route

// route.use('/category', passport.checkAuthIsDone, require("./category.route"));

module.exports = route;