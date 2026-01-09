const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const movieController = require("../controllers/movie.controller");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ================= ROUTES =================
router.get("/", movieController.showAll);
router.get("/add", movieController.addPage);
router.post("/save", upload.single("image"), movieController.saveMovie);
router.get("/edit/:id", movieController.editPage);
router.post("/update/:id", upload.single("image"), movieController.updateMovie);
router.get("/delete/:id", movieController.deleteMovie);

module.exports = router;
