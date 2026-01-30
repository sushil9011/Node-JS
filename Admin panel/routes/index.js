const express = require('express');
const multer = require('multer');

const { dashboardPage, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin, loginPage, checkLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, OTPPage, OTPVerify, newPasswordPage, changeNewPassword } = require('../controllers/admin.controller');

const route = express.Router();

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: myStorage });

// Auth
route.get('/', loginPage);
route.post('/login', checkLogin);

// change password
route.get('/changepassword', changePasswordPage);
route.post('/changePasswordPage', changePassword);

// forgot password
route.post('/verify-email', verifyEmail);

// OTP Page
route.get('/otp-page', OTPPage);
route.post('/otp-verify', OTPVerify);

// New Password Page
route.get('/newPasswordPage', newPasswordPage);
route.post('/change-new-password', changeNewPassword);

// Profile
route.get('/profile', profilePage);

// logout
route.get('/logout', logout);

route.get('/dashboard', dashboardPage);

route.get('/addAdminPage', addAdminPage);
route.get('/viewAdminPage', viewAdminPage);

// Insert Admin
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);

// Delete Admin
route.get('/deleteAdmin', deleteAdmin);

// Edit Admin
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);
module.exports = route;