const express = require('express');
const route = express.Router(); 
const upload = require('../middleware/multer.middleware');
const { 
    addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, 
    verifyEmail,  OTPVerify, newPasswordPage, changeNewPassword, 
    updateAdmin, 
    changePasswordPage,
    changePassword,
    OTPPage
} = require('../controllers/admin.controller');

// --- Password Management ---
route.post('/verifyEmail', verifyEmail);
route.get('/otp-page', OTPPage);
route.post('/otp-verify', OTPVerify);
route.get('/newPasswordPage', newPasswordPage);
route.post('/change-new-password', changeNewPassword);

// --- Admin Management (CRUD) ---
route.get('/addAdminPage', addAdminPage);
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);
route.get('/viewAdminPage', viewAdminPage);
route.get('/deleteAdmin', deleteAdmin);
route.get('/change-password-page',changePasswordPage);
route.post('/change-password', changePassword);
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = route;