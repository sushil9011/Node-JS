const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// --- LOGIN SECTION ---

///// Login Page /////
module.exports.loginPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }
        return res.render('auth/login');
    } catch (err) {
        return res.redirect('/');
    }
}

///// Login check page /////
module.exports.checkLogin = async (req, res) => {
    try {
        req.flash('success', 'Welcome Back!');
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

///// Change Password page /////
module.exports.changePasswordPage = async (req, res) => {
    try {
        return res.render('auth/changePasswordPage', {
            admin: req.user,
            page: 'profile'
        });
    } catch (err) {
        console.log("Error in changePasswordPage:", err);
        req.flash('error', 'Unable to load password change page');
        return res.redirect('/');
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        // req.user Passport session se logged-in admin nikalta hai
        const admin = req.user;
        const { current_psw, new_psw, conform_psw } = req.body;

        // 1. Current Password Check
        if (current_psw !== admin.password) {
            req.flash('error', 'Current Password is wrong!');
            return res.redirect('/change-password'); // Wapas form par bhejo
        }

        // 2. New & Confirm Password Match Check
        if (new_psw !== conform_psw) {
            req.flash('error', 'New and Confirm Passwords do not match!');
            return res.redirect('/change-password'); // Wapas form par bhejo
        }

        if(new_psw === current_psw){
            req.flash('error', 'Current and New Passwords are same!');
            return res.redirect('/change-password');
        }

        // 3. Password Update logic
        await Admin.findByIdAndUpdate(admin._id, { password: new_psw });
        req.flash('success', 'Password updated! Please login again.');

        return res.redirect('/logout'); // Password change ke baad logout karna sahi rehta hai
    } catch (err) {
        console.log("Error in changePassword:", err);
        return res.redirect('/dashboard');
    }
}
// --- FORGOT PASSWORD SECTION (OTP System) ---

///// verifyEmail /////
module.exports.verifyEmail = async (req, res) => {
    try {
        const myAdmin = await Admin.findOne({ email: req.body.email });
        if (!myAdmin) {
            console.log("Admin not found in Database!");
            req.flash('error', 'Email not registered!');
            return res.redirect('/');
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sushilugale04@gmail.com",
                pass: "ovsxouhxsifkpjhf"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000);
        await transporter.sendMail({
            from: '"Admin Panel" <sushilugale04@gmail.com>',
            to: req.body.email,
            subject: "OTP Verification",
            html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
    <div style="text-align: center; margin-bottom: 25px;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #334155 100%); width: 60px; height: 60px; line-height: 60px; border-radius: 12px; color: white; font-size: 24px; font-weight: bold; margin: 0 auto; display: inline-block;">
            A
        </div>
        <h2 style="color: #1e293b; margin-top: 15px; margin-bottom: 5px;">Password Reset Request</h2>
        <p style="color: #64748b; font-size: 14px; margin-top: 0;">Use the code below to verify your identity</p>
    </div>
    
    <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 25px;">
        <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 10px; font-weight: bold;">Your Verification Code</span>
        <h1 style="font-size: 42px; letter-spacing: 8px; color: #6366f1; margin: 0; font-family: monospace;">${OTP}</h1>
    </div>

    <div style="color: #475569; font-size: 14px; line-height: 1.6;">
        <p>Hi Admin,</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px;">
            This OTP is valid for a limited time. Please do not share this code with anyone.
        </p>
    </div>
</div>`
        });



        req.session.otp = OTP;
        req.session.tempAdminId = myAdmin._id.toString();

        req.flash('success', 'OTP sent to your email!');
        return res.redirect('/otp-page');
    } catch (err) {
        req.flash("Error in verifyEmail:", err);
        return res.redirect('/');
    }
}

///// OTPPage /////
module.exports.OTPPage = async (req, res) => {
    try {

        if (!req.session.tempAdminId) {
            return res.redirect('/');
        }
        const admin = await Admin.findById(req.session.tempAdminId);

        return res.render('auth/OTPPage', { admin });
    } catch (err) {
      console.log("Error in OTPPage:", err);
        req.flash('error', 'Something went wrong!'); 
        return res.redirect('/');
    }
}

///// OTPVerify /////
module.exports.OTPVerify = async (req, res) => {
    try {
        const userOTP = req.body.adminOTP;
        const sessionOTP = req.session.otp;

        if (userOTP && sessionOTP && userOTP.toString() === sessionOTP.toString()) {
            req.flash('success', 'OTP Verified!');
            return res.redirect('/newPasswordPage');
        } else {
            req.flash('error', 'Invalid OTP!');
            return res.redirect('/otp-page');
        }
    } catch (err) {
        console.log("Error in OTPVerify:", err);
        return res.redirect('/otp-page');
    }
}

///// newPasswordPage /////
module.exports.newPasswordPage = async (req, res) => {
    try {
        if (!req.session.tempAdminId) {
            req.flash('error', 'Session expired. Please restart the process.');
            return res.redirect('/');
        }

        const admin = await Admin.findById(req.session.tempAdminId);

        return res.render('auth/newPasswordPage', { admin });
    } catch (err) {
        console.log("Error in newPasswordPage:", err);
        req.flash('error', 'Security session failed.'); // Added Flash
        return res.redirect('/');
    }
}

///// ChangeNewPassword page /////
module.exports.changeNewPassword = async (req, res) => {
    try {
        const { new_password, conform_password } = req.body;

        if (new_password === conform_password) {

            const updated = await Admin.findByIdAndUpdate(req.session.tempAdminId, { password: new_password });

            if (updated) {
                req.flash('success', 'Password reset successful! Please login.');

                delete req.session.otp;
                delete req.session.tempAdminId;

                return res.redirect('/');
            }
        }

        req.flash('error', 'Passwords do not match!');
        return res.redirect('/newPasswordPage');
    } catch (err) {
        console.log("Error in changeNewPassword:", err);
        return res.redirect('/');
    }
}

// --- PROFILE & DASHBOARD SECTION ---

module.exports.profilePage = async (req, res) => {
    try {

        return res.render('profile/profilePage', {
            admin: req.user
        });
    } catch (err) {
        console.log("Error in profilePage:", err);
        return res.redirect('/');
    }
}
///// logout page /////
module.exports.logout = (req, res) => {

    req.logout((err) => {
        if (err) {
            console.log("Logout Error:", err);
            return res.redirect('/dashboard');
        }
        req.session.destroy((err) => {
            if (err) {
                console.log("Session Destroy Error:", err);
            }

            res.clearCookie('adminPanel');

            return res.redirect('/');
        });
    });
}

///// DashboardPage /////
module.exports.dashboardPage = async (req, res) => {
    try {
        return res.render('dashboard', { admin: req.user });
    } catch (err) {
        return res.redirect('/');
    }
}

// --- ADMIN MANAGEMENT SECTION ---

module.exports.addAdminPage = async (req, res) => {
    try {

        return res.render('admin/addAdminPage', {
            admin: req.user
        });
    } catch (err) {
        console.log("Error in addAdminPage:", err);
        return res.redirect('/dashboard');
    }
}
///// viewAdminPage /////
module.exports.viewAdminPage = async (req, res) => {
    try {

        const admin = req.user;

        let allAdmin = await Admin.find();

        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);

        return res.render('admin/viewAdminPage', {
            allAdmin,
            admin
        });
    } catch (err) {
        console.log("Error in viewAdminPage:", err);
        req.flash('error', 'Failed to load administrators list');
        return res.redirect('/dashboard');
    }
}
///// insertAdmin /////
module.exports.insertAdmin = async (req, res) => {
    try {
        req.body.profile_image = req.file.path;
        const addAdmin = await Admin.create(req.body);
        req.flash('success', 'Admin added successfully!');
        return res.redirect('/addAdminPage');
    } catch (err) {
        req.flash('error', 'Something went wrong!');
        return res.redirect('/addAdminPage');
    }
}

///// deleteAdmin /////
module.exports.deleteAdmin = async (req, res) => {
    try {

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, (err) => {
                if (err) console.log("File delete error:", err);
            });
        }
        req.flash('success', 'Admin deleted successfully!');
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Delete error:", err);
        return res.redirect('/viewAdminPage');
    }
}

///// editAdminPage /////
module.exports.editAdminPage = async (req, res) => {
    try {
        const singleAdmin = await Admin.findById(req.params.adminId);

        if (!singleAdmin) {
            req.flash('error', 'Admin not found!');
            return res.redirect('/viewAdminPage');
        }
        return res.render('admin/editAdminPage', {
            singleAdmin,
            admin: req.user
        });
    } catch (err) {
        console.log("Error in editAdminPage:", err);
        return res.redirect('/viewAdminPage');
    }
}

///// udateAdmin /////
module.exports.updateAdmin = async (req, res) => {
    try {
        if (req.file) {

            req.body.profile_image = req.file.path;
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);

            if (updatedData && updatedData.profile_image) {

                fs.unlink(updatedData.profile_image, (err) => {
                    if (err) console.log("Old image unlink error:", err);
                });
            }
        } else {
            await Admin.findByIdAndUpdate(req.params.adminId, req.body);
        }

        req.flash('success', 'Admin updated successfully!');

        if (req.params.adminId === req.user.id) {
            return res.redirect('/profile');
        } else {
            return res.redirect('/viewAdminPage');
        }

    } catch (err) {
        console.log("Update Error:", err);
        req.flash('error', 'Something went wrong!');
        return res.redirect('/viewAdminPage');
    }
}