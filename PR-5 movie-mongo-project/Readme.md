# 🎬 Movie Management App (Node.js + MongoDB)

A modern **Movie Management Web Application** built using **Node.js**, **Express**, **MongoDB**, **EJS**, and **Multer**.
This project follows the **MVC (Model–View–Controller)** pattern and allows users to **add, view, edit, and delete movies with poster images**, all through a clean and elegant UI.

---

## 📌 Overview

The Movie Management App is a full-stack CRUD application designed for students and developers learning **Node.js with MongoDB**.
It demonstrates real-world concepts like:

* MVC architecture
* File uploads using Multer
* Image management with File System (fs)
* Server-side rendering using EJS
* Clean UI with custom CSS (no frameworks)

This project is ideal for **college projects, portfolios, and practice**.

---

## ✨ Features

* ➕ Add new movies with poster image
* 📃 View all movies in a grid layout
* ✏️ Edit movie details with optional image update
* 🗑 Delete movies (also deletes image from uploads folder)
* 🖼 Image upload handling using Multer
* 📂 Automatic image removal using fs module
* 🧱 MVC-based clean project structure
* 🎨 Custom modern UI (no Bootstrap)
* 📱 Responsive design

---

## 📁 Folder Structure

```
movie-mongo-project/
│
├── config/
│   └── db.js                # MongoDB connection
│
├── controllers/
│   └── home.controller.js   # All movie logic (CRUD)
│
├── models/
│   └── Movie.js             # Movie schema
│
├── public/
│   ├── css/
│   │   └── style.css        # Application styling
│   └── uploads/             # Uploaded movie images
│
├── routes/
│   └── index.route.js       # Application routes
│
├── views/
│   ├── add.ejs              # Add movie page
│   ├── edit.ejs             # Edit movie page
│   └── list.ejs             # Movie list page
│
├── server.js                # App entry point
├── package.json
└── README.md
```

---

## 🛠 Technologies Used

### Backend

* **Node.js**
* **Express.js**

### Database

* **MongoDB**
* **Mongoose**

### Frontend

* **EJS (Embedded JavaScript Templates)**
* **Custom CSS**

### Utilities

* **Multer** – file uploads
* **fs (File System)** – image delete handling

---

## ⚙ Installation Steps

### Prerequisites

* Node.js installed
* MongoDB running locally

### Install Dependencies

```bash
npm install
```

Required packages:

* express
* mongoose
* ejs
* multer
* nodemon (dev dependency)

---

## ▶ How to Run the Project

### Start MongoDB

Make sure MongoDB is running on your system.

### Start the Server

```bash
npm start
```

OR (if nodemon configured):

```bash
npm run dev
```

### Open in Browser

```
http://localhost:4000
```

---

## 🧪 Usage Examples

### ➕ Add Movie

* Enter movie name, category, rating
* Upload poster image
* Click **Save Movie**

### 📃 View Movies

* Displays all movies in a card-based layout
* Shows poster, name, category, rating

### ✏️ Edit Movie

* Update details
* Optional image replacement

### 🗑 Delete Movie

* Deletes movie from database
* Also deletes image from `public/uploads`

---

## 📸 demo



### 🏠 Add Movie Page

![Add Movie Page](screenshots/add.png)

### 🎞 Movie List Page

![Movie List Page](screenshots/list.png)

### ✏️ Edit Movie Page

![Edit Movie Page](screenshots/edit.png)

---

## 📝 Notes

* Project follows **MVC architecture**
* Multer handles image upload
* fs module ensures no unused images remain
* No frontend frameworks used
* Easy to understand for beginners
* Clean and extendable structure

---

## 🚀 Future Improvements

* 🔐 Authentication (Login / Signup)
* 🔍 Search and filter movies
* 📄 Pagination
* ⭐ Ratings with stars UI
* ☁️ Cloud image storage (Cloudinary)
* 🌐 REST API version
* 🎨 Dark / Light theme toggle

---

### 👤 Author

**Sushil Ugale**
