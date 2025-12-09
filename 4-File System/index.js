// fs module ko import kar rahe hain
const fs = require("fs");

// 1️ File create + write
fs.writeFileSync("./myfile.txt", "Hello, this is the first line.");
console.log(" Step 1: File created and first line written.");

// 2️ File read
let data = fs.readFileSync("./myfile.txt", "utf8");
console.log(" Step 2: File content after create:");
console.log(data);

// 3️ File me content add (append)
fs.appendFileSync("./myfile.txt", "\nThis is an added line.");
console.log(" Step 3: Extra line added.");

// 4 Dobara read karke check karo
data = fs.readFileSync("./myfile.txt", "utf8");
console.log(" Step 4: File content after append:");
console.log(data);

// 5️ File rename karna
fs.renameSync("./myfile.txt", "renamed_file.txt");
console.log(" Step 5: File renamed to 'renamed_file.txt'");

// 6️ Renamed file ko read karke confirm karo
data = fs.readFileSync("./renamed_file.txt", "utf8");
console.log(" Step 6: Content of renamed file:");
console.log(data);

// // 7️ File delete karna
// fs.unlinkSync("./renamed_file.txt");
// console.log(" Step 7: File deleted successfully.");
