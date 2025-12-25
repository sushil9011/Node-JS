const express = require("express");
const db = require("./config/db.config");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", require("./routes/perfumeRoutes"));

app.listen(PORT, () => {
  console.log("Server Started...😍");
});