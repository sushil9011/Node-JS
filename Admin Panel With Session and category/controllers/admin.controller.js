const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Category = require('../model/category');
const Subcategory = require('../model/subcategory.model');
const Extracategory = require('../model/extracategory.model');
const Product = require('../model/product.model');

// --- AUTH & PAGES ---
module.exports.loginPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) return res.redirect('/dashboard');
        return res.render('auth/login');
    } catch (err) { return res.redirect('/'); }
}

module.exports.checkLogin = async (req, res) => {
    req.flash('success', 'Welcome Back!');
    return res.redirect('/dashboard');
}

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully!');
        return res.redirect('/');
    });
}

module.exports.dashboardPage = async (req, res) => {
    try {

        const totalCat = await Category.countDocuments();
        const totalSub = await Subcategory.countDocuments();
        const totalExtra = await Extracategory.countDocuments();
        const totalProduct = await Product.countDocuments();


        return res.render('dashboard', {
            admin: req.user,
            totalCat,
            totalSub,
            totalExtra,
            totalProduct
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.profilePage = async (req, res) => {
    return res.render('profile/profilePage', { admin: req.user });
}

// --- PASSWORD RECOVERY (SESSION BASED) ---
module.exports.verifyEmail = async (req, res) => {
    try {
        console.log("Email received:", req.body.email);
        const myAdmin = await Admin.findOne({ email: req.body.email });

        if (!myAdmin) {
            req.flash('error', 'Email not registered!');
            return res.redirect('/');
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sushilugale04@gmail.com",
                pass: "ovsxouhxsifkpjhf"
            }
        });

        let mailOptions = {
            from: 'sushilugale04@gmail.com',
            to: req.body.email,
            subject: "OTP for Reset Password",
            html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 450px; margin: 0 auto; padding: 30px; border-radius: 20px; text-align: center; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
        <div style="margin-bottom: 20px;">
            <div style="background: #e0f2fe; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                <span style="font-size: 30px;">🔐</span>
            </div>
        </div>
        
        <h2 style="color: #1e293b; margin-top: 0; font-weight: 800; letter-spacing: -0.5px;">Verification Required</h2>
        <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">Please use the following One-Time Password (OTP) to complete your secure login process.</p>
        
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 15px; margin-bottom: 30px;">
            <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #0f172a; font-family: 'Courier New', monospace;">${OTP}</span>
        </div>

        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 0;">If you did not request this code, please ignore this email or contact support if you have concerns.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
            <p style="color: #1e293b; font-size: 14px; font-weight: 700; margin-bottom: 5px;">Admin Dashboard Team</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Secure Management System</p>
        </div>
    </div>
`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully. OTP:", OTP);

        // Session mein data save karna
        req.session.recoveryData = {
            otp: OTP,
            adminId: myAdmin._id,
            email: myAdmin.email,
            fname: myAdmin.fname,
            profile_image: myAdmin.profile_image
        };

        req.flash('success', 'OTP sent to your email!');
        return res.redirect('/admin/otp-page');

    } catch (err) {
        console.log("Nodemailer Error:", err); // Agar mail nahi gayi toh yahan dikhega
        req.flash('error', 'Failed to send email. Check App Password.');
        return res.redirect('/');
    }
}

module.exports.OTPPage = async (req, res) => {
    if (!req.session.recoveryData) return res.redirect('/');
    return res.render('auth/OTPPage', { admin: req.session.recoveryData });
}

module.exports.OTPVerify = async (req, res) => {
    try {
        const userOTP = req.body.adminOTP; // EJS mein name="adminOTP" hai
        const sessionData = req.session.recoveryData;

        console.log("User entered:", userOTP, "Correct OTP:", sessionData ? sessionData.otp : "No Session");

        if (sessionData && userOTP == sessionData.otp) {

            req.session.tempAdminId = sessionData.adminId;

            req.flash('success', 'OTP Verified Successfully!');
            return res.redirect('/admin/newPasswordPage');
        } else {
            req.flash('error', 'Invalid OTP, please try again.');
            return res.redirect('/admin/otp-page');
        }
    } catch (err) {
        console.log("OTP Verify Error:", err);
        return res.redirect('/');
    }
}

module.exports.newPasswordPage = async (req, res) => {
    if (!req.session.recoveryData) return res.redirect('newPasswordPage');
    return res.render('auth/newPasswordPage', { admin: req.session.recoveryData });
}

module.exports.changeNewPassword = async (req, res) => {
    try {
        const { new_password, conform_password } = req.body;

        // 1. Session Check (Kya OTP verify ho chuka hai?)
        if (!req.session.tempAdminId) {
            req.flash('error', 'Session expired. Please start again.');
            return res.redirect('/');
        }

        // 2. Matching Passwords Check
        if (new_password !== conform_password) {
            req.flash('error', 'New and Confirm passwords do not match!');
            return res.redirect('/');
        }

        // 3. Password Update Logic
        const updated = await Admin.findByIdAndUpdate(req.session.tempAdminId, {
            password: new_password
        });

        if (updated) {
            // Password badalne ke baad purana session delete karein
            delete req.session.otp;
            delete req.session.tempAdminId;

            req.flash('success', 'Password updated successfully! Please login.');
            return res.redirect('/');
        } else {
            req.flash('error', 'Failed to update password. User not found.');
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Error in changeNewPassword:", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/newPasswordPage');
    }
}

// --- MISSING PASSWORD CHANGE LOGIC ---
module.exports.changePasswordPage = async (req, res) => {
    return res.render('auth/changePasswordPage', { admin: req.user });
}

// --- Update Password Logic ---
module.exports.changePassword = async (req, res) => {
    try {
        const { current_psw, new_psw, conform_psw } = req.body;

        // Current Password Check
        if (req.user.password !== current_psw) {
            req.flash('error', 'Current password is wrong!');
            return res.redirect('/admin/change-password-page'); // Wapas change password page par rahein
        }

        // Matching Passwords Check
        if (new_psw !== conform_psw) {
            req.flash('error', 'New and Confirm passwords do not match!');
            return res.redirect('/admin/change-password-page');
        }

        await Admin.findByIdAndUpdate(req.user._id, { password: new_psw });
        req.flash('success', 'Password updated successfully!');
        return res.redirect('/profile');

    } catch (err) {
        req.flash('error', 'Something went wrong!');
        return res.redirect('/admin/change-password-page');
    }
}
// --- ADMIN CRUD ---
module.exports.addAdminPage = async (req, res) => {
    return res.render('admin/addAdminPage', { admin: req.user });
}

module.exports.insertAdmin = async (req, res) => {
    try {
        if (req.file) req.body.profile_image = req.file.path;
        await Admin.create(req.body);
        req.flash('success', 'Admin Added!');
        return res.redirect('/admin/viewAdminPage');
    } catch (err) { return res.redirect('back'); }
}

module.exports.viewAdminPage = async (req, res) => {
    try {

        let allAdmin = await Admin.find({});

        allAdmin = allAdmin.filter((subadmin) => subadmin.email !== req.user.email);
        console.log("allAddmin ", allAdmin);

        return res.render('admin/viewAdminPage', { allAdmin, admin: req.user });
    } catch (err) { return res.redirect('/'); }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);
        if (deletedUser && deletedUser.profile_image) fs.unlink(deletedUser.profile_image, () => { });
        req.flash('success', 'Admin Deleted!');
        return res.redirect('/admin/viewAdminPage');
    } catch (err) { return res.redirect('/admin/viewAdminPage'); }
}

module.exports.editAdminPage = async (req, res) => {
    try {
        const singleAdmin = await Admin.findById(req.params.adminId);
        return res.render('admin/editAdminPage', { singleAdmin, admin: req.user });
    } catch (err) { return res.redirect('/admin/viewAdminPage'); }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile_image = req.file.path;
            const oldData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);
            if (oldData.profile_image) fs.unlink(oldData.profile_image, () => { });
        } else {
            await Admin.findByIdAndUpdate(req.params.adminId, req.body);
        }
        req.flash('success', 'Admin Updated!');
        return res.redirect('/admin/viewAdminPage');
    } catch (err) { return res.redirect('/admin/viewAdminPage'); }
}