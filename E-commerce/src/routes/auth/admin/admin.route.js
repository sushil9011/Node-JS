const express = require('express');
const { 
    registerAdmin, 
    loginAdmin, 
    fetchAllAdmin, 
    forgotPassword, 
    verifyOTP, 
    newPassword, 
    deleteAdmin, 
    updateAdmin, 
    activeOrInActiveAdmin, 
    adminProfile, 
    changePassword 
} = require('../../../controllers/auth/admin/admin.controller');

const { authMiddleware } = require('../../../middleware/auth.middleware');
const { storage } = require('../../../middleware/storage.middleware');
const multer = require('multer');

const adminRoute = express.Router();
const upload = multer({ storage });

// ================= PUBLIC ROUTES (No Token Required) =================
adminRoute.post('/register', upload.single('profile_image'), registerAdmin);
adminRoute.post('/login', loginAdmin);
adminRoute.post('/forgot-password', forgotPassword);
adminRoute.post('/verify-otp', verifyOTP);
adminRoute.post('/new-password', newPassword);


// ================= SECURE ROUTES (Token Required) =================
// Iske niche wale sabhi routes ke liye Postman mein Bearer Token bhejna hoga
adminRoute.use(authMiddleware); 

adminRoute.get('/', fetchAllAdmin);
adminRoute.get('/profile', adminProfile);
adminRoute.post('/change-password', changePassword);
adminRoute.patch('/:id', updateAdmin);
adminRoute.delete('/', deleteAdmin);
adminRoute.put('/', activeOrInActiveAdmin);

module.exports = adminRoute;