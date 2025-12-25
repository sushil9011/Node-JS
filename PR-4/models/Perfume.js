const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String
});
const Perfumes = mongoose.model("Perfume", perfumeSchema, "Perfumes");

module.exports = Perfumes;