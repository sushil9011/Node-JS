const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');

const route = express.Router();

// 1. In routes par koi token nahi maanga jayega (Public)
route.use('/auth', require('./auth/auth.route'));

// Admin Register/Login ko open rakhne ke liye ise yahan layein
const adminRoutes = require('./auth/admin/admin.route');
const userRoutes = require('./auth/user/user.route');

// 2. Auth Middleware (Sirf niche wale routes ke liye apply hoga)
// Lekin hume register/login ko isse bachana hai

route.use('/admin', adminRoutes); 
route.use('/user', userRoutes);
route.use('/category', authMiddleware, require('./category/category.route'));

module.exports = route;