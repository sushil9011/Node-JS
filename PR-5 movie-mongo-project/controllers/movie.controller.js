const Movie = require("../models/movie.model");
const fs = require("fs");          // 👈 fs MODULE (FILE SYSTEM)
const path = require("path");

// ================= SHOW ALL MOVIES =================
exports.showAll = async (req, res) => {
    const movies = await Movie.find();
    res.render("list", { movies });
};

// ================= ADD PAGE =================
exports.addPage = (req, res) => {
    res.render("add");
};

// ================= SAVE MOVIE =================
exports.saveMovie = async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        category: req.body.category,
        rating: req.body.rating,
        image: req.file.filename
    });

    await movie.save();
    res.redirect("/");
};

// ================= EDIT PAGE =================
exports.editPage = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("edit", { movie });
};

// ================= UPDATE MOVIE =================
exports.updateMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    const updateData = {
        name: req.body.name,
        category: req.body.category,
        rating: req.body.rating
    };

    // 👉 fs USED HERE (old image delete)
    if (req.file) {
        const oldImagePath = path.join(
            __dirname,
            "..",
            "public",
            "uploads",
            movie.image
        );

        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // 👈 fs delete
        }

        updateData.image = req.file.filename;
    }

    await Movie.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/");
};

// ================= DELETE MOVIE =================
exports.deleteMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    // 👉 fs USED HERE (image delete)
    const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        movie.image
    );

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // 👈 fs delete
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
};
