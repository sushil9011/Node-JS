const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');

router.get('/', student.getAllStudents);
router.get('/:id', student.getStudentById);
router.post('/', student.addStudent);
router.put('/:id', student.updateStudent);
router.delete('/:id', student.deleteStudent);

module.exports = router;