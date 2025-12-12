
# 📌 **To-Do List App (Node.js + Express + EJS)**

A simple and clean To-Do List web app built using **Node.js, Express, and EJS**.
Users can **add, edit, delete, and view tasks** easily.
This project is perfect for beginners learning backend + templating.

---

## 🚀 Features

* ➕ Add new tasks
* 📝 Edit existing tasks
* ❌ Delete tasks
* 📄 Display task list dynamically
* 🎨 Clean UI using **Bootstrap 5**
* ⚡ Fast and lightweight backend

---

## 🛠️ Tech Stack

| Technology      | Purpose            |
| --------------- | ------------------ |
| **Node.js**     | JavaScript runtime |
| **Express.js**  | Web framework      |
| **EJS**         | Templating engine  |
| **Bootstrap 5** | UI styling         |

---

## 📁 Folder Structure

```
project-folder/
│
├── app.js
└── views/
    ├── view.ejs
    ├── form.ejs
    └── edit.ejs
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone this repository

```bash
git clone <your-repo-url>
cd your-project-folder
```

### 2️⃣ Install dependencies

```bash
npm install express ejs
```

### 3️⃣ Run the server

```bash
node app.js
```

### 4️⃣ Open in browser

Visit:

```
http://localhost:8080/
```

Your To-Do List app is now running! 🎉

---

## 📜 Routes Overview

| Route               | Method | Description           |
| ------------------- | ------ | --------------------- |
| `/`                 | GET    | Show task list        |
| `/addUser`          | GET    | Display Add Task page |
| `/addUser`          | POST   | Add a new task        |
| `/deleteUser?id=ID` | GET    | Delete a task         |
| `/editUser?id=ID`   | GET    | Show Edit form        |
| `/updateUser`       | POST   | Update existing task  |

---

## 🖼️ Screenshots (optional)

You can add screenshots here:

```


https://github.com/user-attachments/assets/de043459-7daa-407c-81d4-507165879eeb


---

## 📦 Example Data Structure

```js
let myTasks = [
    { id: 1, task: "Learn Javascript" },
    { id: 2, task: "Learn Typescript" },
    { id: 3, task: "Node JS" }
];
```

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues for suggestions or improvements.

---

## 📄 License

This project is free to use for learning and educational purposes.

---

## ❤️ Made by Sushil (Student Project)

If you need a **MongoDB version, REST API version, authentication, or complete frontend**, just tell me — I can upgrade this project to the next level.
