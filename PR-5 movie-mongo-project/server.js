const express = require("express");
const path = require("path");
require("./config/db.config");

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// static files (css, uploads, images)
app.use(express.static(path.join(__dirname, "public")));


// routes
app.use("/", require("./routes"));

app.listen(PORT, e => {

    if(e) {
        console.log("Server is not started" , e);
        return;
    }

    console.log("Movie server started on port " + PORT);
});
