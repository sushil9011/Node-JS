const express = require("express");
const app = express();

const PORT = 10000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/css'));

let usersData = [
  { id: 234, name: "Virat Kohli", profileName: "chiku", email: "ViratKohli1080@gmail.com", password: "anushka269" },
  { id: 578, name: "Hardik Pandya", profileName: "Hardik18@", email: "Hardik33@gmail.com", password: " AgastyaPandya" },
  { id: 152, name: "rohit sharma", profileName: "rohit@", email: "rohitsharma45@gmail.com", password: "mumbai indians" }
];

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/addUser", (req, res) => {
  let data = req.body;
  data.id = Math.floor(Math.random() * 900) + 100;
  usersData.push(data);
  res.render("userData", { usersData });
});

app.post("/loginUser", (req, res) => {
  let { email, password } = req.body;
  let u = usersData.find(x => x.email == email && x.password == password);
  if (!u) return res.redirect("/registerPage");
  res.render("userData", { usersData });
});

app.get("/registerPage", (req, res) => {
  res.render("registerPage");
});

app.get("/backUser", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server Running on:", PORT);
});
