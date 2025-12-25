const Perfume = require("../models/Perfume");

// LIST
exports.getAllPerfumes = async (req, res) => {
  const data = await Perfume.find();
  res.render("list", { perfumes: data });
};

// ADD
exports.addPerfume = async (req, res) => {
  await Perfume.create(req.body);
  res.redirect("/list");
};

// DELETE
exports.deletePerfume = async (req, res) => {
  await Perfume.findByIdAndDelete(req.params.id);
  res.redirect("/list");
};

// EDIT → OPEN ADD PAGE WITH FILLED DATA
exports.editPerfume = async (req, res) => {
  const perfume = await Perfume.findById(req.params.id);
  res.render("add", { editData: perfume });
};

// UPDATE
exports.updatePerfume = async (req, res) => {
  await Perfume.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/list");
};
