const studentService = require("./student/studentService");
const logger = require("./utils/logger");

// Add students
studentService.addStudent("Rahul", 20);
studentService.addStudent("Amit", 22);

// Show students
logger("All Students:");
console.log(studentService.getStudents());

// Delete student
studentService.deleteStudent("Rahul");

// Show again
logger("After Deletion:");
console.log(studentService.getStudents());
