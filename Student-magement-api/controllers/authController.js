const User = require('../models/User');
global.isLoggedIn = false; 

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("User already exists.");

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("Registration successful. Please login.");
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).send("User does not exist. Please register first.");
    if (user.password !== password) return res.status(401).send("Invalid credentials.");

    global.isLoggedIn = true;
    res.send("Login successful!");
};

exports.logout = (req, res) => {
    global.isLoggedIn = false;
    res.send("Logged out successfully.");
};