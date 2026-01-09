const students = require("./studentData");

// Add student
function addStudent(name, age) {
  students.push({ name, age });
}

// Get all students
function getStudents() {
  return students;
}

// Delete student
function deleteStudent(name) {
  const index = students.findIndex(s => s.name === name);
  if (index !== -1) {
    students.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  addStudent,
  getStudents,
  deleteStudent
};
