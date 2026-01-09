const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/Movie_DB";

mongoose.connect(URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("DB error:", err));
