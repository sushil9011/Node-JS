const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/admin.model');

passport.use("localAuth", new localStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    console.log("Email : ", email);
    console.log("Password : ", password);

    const admin = await Admin.findOne({ email });

    if (!admin) {
        console.log("Admin not found...");
        return done(null, false);
    }

    if (password !== admin.password) {
        console.log("Password is wrong..");
        return done(null, false);
    }

    return done(null, admin);

}));


passport.serializeUser((admin, done) => {
    console.log("Admin Serialize : ", admin);

    return done(null, admin.id);
});

passport.deserializeUser(async (adminId, done) => {
    console.log("Deserialize  : ", adminId);

    const currentAdmin = await Admin.findById(adminId);

    console.log("Current Admin : ", currentAdmin);

    return done(null, currentAdmin);// To store data in session 
});

passport.checkAuthIsDone = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/'); // Agar login nahi hai toh login page par bhejo
}

passport.checkAuthIsNotDone = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/dashboard'); // Agar login hai toh wapas dashboard par bhejo
}

passport.currentAdmin = (req, res, next) => {
    console.log("hi");

    if (req.isAuthenticated()) {
        res.locals.admin = req.user;

        // res.locals.email = "sushil@gamil.com";
        /*
            locals = {
                admin : {
                    id:
                    fname:
                    lname:
                    email:
                    password:
                },
                email: "sushil@gmail.com"
            }
        */
    }
    next();
}