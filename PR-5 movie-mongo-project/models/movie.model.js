const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name: String,
    category: String,
    rating: Number,
    image: String   // image filename
});

module.exports = mongoose.model("Movie", movieSchema);
