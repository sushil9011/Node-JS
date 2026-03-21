const Student = require('../models/Student');
const { validateStudent } = require('../utils/validation');

exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Student not found.");
        res.json(student);
    } catch (err) { res.status(400).send("Invalid ID format."); }
};

exports.addStudent = async (req, res) => {
    if (!global.isLoggedIn) return res.status(401).send("Access denied. Please login first.");
    const error = validateStudent(req.body);
    if (error) return res.status(400).send(error);

    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send("Student added successfully.");
};

exports.updateStudent = async (req, res) => {
    if (!global.isLoggedIn) return res.status(401).send("Access denied. Please login first.");
    const error = validateStudent(req.body);
    if (error) return res.status(400).send(error);

    const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    if (!student) return res.status(404).send("ID must exist for update"); 
    res.send("Student updated successfully.");
};

exports.deleteStudent = async (req, res) => {
    if (!global.isLoggedIn) return res.status(401).send("Access denied. Please login first.");
    const student = await Student.findByIdAndDelete(req.params.id); 
    if (!student) return res.status(404).send("ID must exist for delete"); 
    res.send("Student deleted successfully.");
};