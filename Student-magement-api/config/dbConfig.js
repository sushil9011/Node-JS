const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://sushilugale04_db_user:SAGAR14@cluster0.jnywiau.mongodb.net/Student-api?appName=Cluster0"; 
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully...");
    } catch (err) {
        console.error("Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;