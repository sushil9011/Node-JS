const express = require("express");
const app = express();

const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let myTasks = [
    { id: 1, task: "Learn Javascript" },
    { id: 2, task: "Learn Typescript" },
    { id: 3, task: "Node JS" }
];

let nextId = 4;


app.get("/", (req, res) => {
    res.render("view", {
        userTasks: myTasks
    });
});


app.get("/addUser", (req, res) => {
    res.render("form");
});


app.post("/addUser", (req, res) => {
    const newTask = req.body;       
    newTask.id = nextId++;
    myTasks.push(newTask);
    res.redirect("/");
});


app.get("/deleteUser", (req, res) => {
    const deleteId = req.query.id;
    myTasks = myTasks.filter(t => t.id != deleteId);
    res.redirect("/");
});


app.get("/editUser", (req, res) => {
    const foundUser = myTasks.find(t => t.id == req.query.id);
    if (!foundUser) return res.redirect("/");
    res.render("edit", { user: foundUser });
});


app.post("/updateUser", (req, res) => {
    const updated = req.body;   

    myTasks = myTasks.map(t => {
        if (t.id == updated.id) return updated;
        return t;
    });

    res.redirect("/");
});

app.listen(PORT, (err) => {
    if (err) return console.log("Server not started...");
    console.log("Server running on port:", PORT);
});
