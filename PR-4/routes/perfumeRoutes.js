const express = require("express");
const router = express.Router();
const controller = require("../controllers/perfumeController");

// DEFAULT → ADD PAGE
router.get("/", (req, res) => {
  res.render("add", { editData: null });
});

// LIST PAGE
router.get("/list", controller.getAllPerfumes);

// ADD
router.post("/add", controller.addPerfume);

// DELETE
router.get("/delete/:id", controller.deletePerfume);

// EDIT → OPEN ADD PAGE WITH DATA
router.get("/edit/:id", controller.editPerfume);

// UPDATE
router.post("/update/:id", controller.updatePerfume);

module.exports = router;
