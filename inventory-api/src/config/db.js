
const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully...");
    } catch (err) {
        console.log("DB Connection Error: ", err);
    }
};