const express = require('express');
const { registerUser, loginUser, forgotPassword, verifyOTP, newPassword, fetchAllUser, deleteUser, updateUser, activeOrInActiveUser, userProfile, changePassword } = require('../../../controllers/auth/user/user.controller');
const { storage } = require('../../../middleware/storage.middleware');
const multer = require('multer');
const { authMiddleware } = require('../../../middleware/auth.middleware');

const userRoute = express.Router();
const upload = multer({ storage });

// Public Routes
userRoute.post('/register', upload.single('profile_image'), registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/verify-otp', verifyOTP);
userRoute.post('/new-password', newPassword);

// Secure Routes (Token Required)
userRoute.use(authMiddleware);

userRoute.get('/', fetchAllUser);
userRoute.delete('/', deleteUser);
userRoute.patch('/', updateUser);
userRoute.put('/', activeOrInActiveUser);
userRoute.get('/profile', userProfile);
userRoute.post('/change-password', changePassword);

module.exports = userRoute;