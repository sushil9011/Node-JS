const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// --- LOGIN SECTION ---

// Login Page dikhane ke liye
module.exports.loginPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId && admin) {
            return res.redirect('/dashboard');
        }
        return res.render('auth/login');
    } catch (err) {
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Login check karne ke liye
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }
        if (admin.password != req.body.password) {
            console.log("Pasword not matched...");
            return res.redirect('/');
        }
        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// --- PASSWORD CHANGE SECTION (Inside Login) ---

// Change Password ka page
module.exports.changePasswordPage = async (req, res) => {
    try {
        if (!req.cookies.adminId) return res.redirect('/');
        const admin = await Admin.findById(req.cookies.adminId);
        return res.render('auth/changePasswordPage', { admin, page: 'profile' });
    } catch (err) {
        return res.redirect('/');
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        // 1. Check if cookie exists
        if (!req.cookies.adminId) {
            return res.redirect('/');
        }

        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) {
            return res.redirect('/');
        }

        const { current_psw, new_psw, conform_psw } = req.body;

        // 2. Check if current password matches DB
        // Note: Agar bcrypt use kar rahe ho toh yahan bcrypt.compare use karein
        if (current_psw !== admin.password) {
            console.log("Current Password does not match database");
            return res.redirect('/changepassword'); // Fixed URL
        }

        // 3. Check if new password is same as old
        if (new_psw === admin.password) {
            console.log("New Password cannot be same as Old Password");
            return res.redirect('/changepassword'); // Fixed URL
        }

        // 4. Check if new and confirm passwords match
        if (new_psw !== conform_psw) {
            console.log("New and Confirm passwords do not match");
            return res.redirect('/changepassword'); // Fixed URL
        }

        // 5. Update password
        const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, { 
            password: new_psw 
        });

        if (updatedAdmin) {
            console.log("Password updated successfully!");
            res.clearCookie('adminId');
            return res.redirect('/'); // Password change ke baad login pe bhejna better hai
        }

    } catch (err) {
        console.log("Error in changePassword:", err);
        return res.redirect('/dashboard');
    }
}

// --- FORGOT PASSWORD SECTION (OTP System) ---

// Email verify karke OTP bhejna
module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });
        if (!myAdmin) {
            console.log("Admin not found in Database!");
            return res.redirect('/');
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sushilugale04@gmail.com",
                pass: "bfqefpmvmigsxdwm"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000);
await transporter.sendMail({
    from: '"Admin Panel" <sushilugale04@gmail.com>',
    to: req.body.email,
    subject: "OTP Verification",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #3b7ddd; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">Password Reset</h1>
        </div>
        <div style="padding: 40px 30px; background-color: #ffffff; text-align: center;">
            <p style="color: #64748b; font-size: 16px; margin-bottom: 25px;">You requested to reset your password. Use the following OTP to complete the verification process:</p>
            <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; display: inline-block;">
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1e293b;">${OTP}</span>
            </div>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 25px;">This OTP is valid for 10 minutes only. Please do not share this code with anyone.</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">© 2026 Admin Panel. All rights reserved.</p>
        </div>
    </div>
    `
});
        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id.toString());
        return res.redirect('/otp-page');
    } catch (err) {
        console.log("Error in verifyEmail:", err);
        return res.redirect('/');
    }
}

// OTP enter karne wala page
module.exports.OTPPage = async (req, res) => {
    try {
        if (!req.cookies.id) return res.redirect('/');
        const admin = await Admin.findById(req.cookies.id);
        return res.render('auth/OTPPage', { admin });
    } catch (err) {
        return res.redirect('/');
    }
}

// OTP match karne ka logic
module.exports.OTPVerify = async (req, res) => {
    try {
        const userOTP = req.body.adminOTP;
        const cookieOTP = req.cookies.OTP;
        if (userOTP && cookieOTP && userOTP.toString() === cookieOTP.toString()) {
            return res.redirect('/newPasswordPage');
        } else {
            return res.redirect('/otp-page');
        }
    } catch (err) {
        return res.redirect('/otp-page');
    }
}

// Naya password set karne ka page
module.exports.newPasswordPage = async (req, res) => {
    try {
        if (!req.cookies.id) return res.redirect('/');
        const admin = await Admin.findById(req.cookies.id);
        return res.render('auth/newPasswordPage', { admin });
    } catch (err) {
        return res.redirect('/');
    }
}

// Naya password final update karna
module.exports.changeNewPassword = async (req, res) => {
    try {
        const { new_password, conform_password } = req.body;
        if (new_password === conform_password) {
            const updated = await Admin.findByIdAndUpdate(req.cookies.id, { password: new_password });
            if (updated) {
                res.clearCookie('OTP');
                res.clearCookie('id');
                return res.redirect('/');
            }
        }
        return res.redirect('/newPasswordPage');
    } catch (err) {
        return res.redirect('/');
    }
}

// --- PROFILE & DASHBOARD SECTION ---

// Profile page dikhana
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        return res.render('profile/profilePage', { admin });
    } catch (err) {
        return res.redirect('/');
    }
}

// Admin logout
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

// Dashboard dikhana
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        return res.render('dashboard', { admin });
    } catch (err) {
        return res.redirect('/');
    }
}

// --- ADMIN MANAGEMENT SECTION ---

// Naya admin add karne ka page
module.exports.addAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        return res.render('admin/addAdminPage', { admin });
    } catch (err) {
        return res.redirect('/dashboard');
    }
}

// Saare admins dekhne ka page
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('admin/viewAdminPage', { allAdmin, admin });
    } catch (err) {
        return res.redirect('/dashboard');
    }
}

// Database mein admin insert karna
module.exports.insertAdmin = async (req, res) => {
    try {
        req.body.profile_image = req.file.path;
        const addAdmin = await Admin.create(req.body);
        return res.redirect('/addAdminPage');
    } catch (err) {
        return res.redirect('/addAdminPage');
    }
}

// Admin delete karna
module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);
        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
        }
        return res.redirect('/viewAdminPage');
    } catch (err) {
        return res.redirect('/viewAdminPage');
    }
}

// Admin edit karne ka page
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);
        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }
        const singleAdmin = await Admin.findById(req.params.adminId);
        return res.render('admin/editAdminPage', { singleAdmin, admin });
    } catch (err) {
        return res.redirect('/viewAdminPage');
    }
}

// Admin details update karna
module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile_image = req.file.path;
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);
            if (updatedData) {
                fs.unlink(updatedData.profile_image, () => { });
            }
        } else {
            await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });
        }
        return (req.params.adminId === req.cookies.adminId) ? res.redirect('/profile') : res.redirect('/viewAdminPage');
    } catch (err) {
        return res.redirect('/viewAdminPage');
    }
}