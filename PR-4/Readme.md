```md
# 🌸 Perfume Management App — Node.js CRUD Project

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8B0000)
![License](https://img.shields.io/badge/License-Educational-blue)

---

## 📌 Project Overview

**Perfume Management App** is a full-stack **Node.js CRUD application** built using **Express.js**, **MongoDB**, and **EJS**.  
The project allows users to **add, view, update, and delete perfume records**, demonstrating strong fundamentals of backend development, MVC-style architecture, database integration, and server-side rendering.

This project is ideal for:
- 🎓 Students learning Node.js & MongoDB  
- 💻 Beginners building CRUD-based projects  
- 📄 Resume & portfolio showcasing  

---

## ✨ Features

- ➕ Add new perfume details  
- 📄 View all perfumes in a clean list  
- ✏ Update existing perfume information  
- 🗑 Delete perfume records  
- 🖼 Supports both **online image URLs** and **local images**  
- 🧠 MVC-based project structure  
- 🖥 Server-side rendering using EJS  

---

## 🛠 Technologies Used

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**
- **Mongoose ODM**

### Frontend
- **EJS (Embedded JavaScript Templates)**
- **CSS**

---

## 📁 Project Folder Structure

```

PR-4/
│
├── config/
│   └── db.config.js          # MongoDB connection configuration
│
├── controllers/
│   └── perfumeController.js  # All CRUD logic (Add, List, Edit, Delete)
│
├── images/
│   └── p1.jpg                # Local perfume images
│
├── models/
│   └── Perfume.js            # Mongoose schema & model
│
├── routes/
│   └── perfumeRoutes.js      # Application routes
│
├── views/
│   ├── add.ejs               # Add / Update perfume page
│   └── list.ejs              # List all perfumes
│
├── node_modules/
├── package.json
├── package-lock.json
└── server.js                 # Application entry point

````

---

## 🔄 Application Workflow

1. User fills perfume details using the form  
2. Express handles routes and requests  
3. Mongoose communicates with MongoDB  
4. Data is stored, fetched, updated, or deleted  
5. EJS dynamically renders updated UI  

---

## ⚙ Installation Steps

### Prerequisites
- Node.js installed  
- MongoDB running locally  
- npm package manager  

### Installation

```bash
git clone <your-repository-url>
cd PR-4
npm install
````

---

## ▶ How to Run the Project

```bash
node server.js
```

Open browser and visit:

```
http://localhost:3000
```

---

## 🚀 Usage Examples

| Method | Route         | Description                |
| -----: | ------------- | -------------------------- |
|    GET | `/`           | Open add perfume page      |
|   POST | `/add`        | Save new perfume           |
|    GET | `/list`       | Display all perfumes       |
|    GET | `/edit/:id`   | Open update page with data |
|   POST | `/update/:id` | Update perfume details     |
|    GET | `/delete/:id` | Delete perfume             |

---

## 🖼 Output / Screenshots

👉 **Below is the output of the Perfume Management App:**



https://github.com/user-attachments/assets/7f86a169-6b2f-43cf-a775-9d679b16e2e5


---

## 📝 Notes

* Local images must be placed inside the `images` folder
* While adding local images, only the **file name** (e.g., `p1.jpg`) should be entered
* Online image URLs can also be used directly
* The project follows a clean and beginner-friendly structure

---

## 🚀 Future Improvements

* Input validation and error handling
* Image upload using Multer
* Authentication & authorization
* Search and filter functionality
* Pagination for large datasets
* Deployment on cloud platforms (Render / Railway / AWS)

---

<div align="right">

**— Sushil Ugale**

</div>
```
