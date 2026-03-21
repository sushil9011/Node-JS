# 🎓 Student Management System API

A professional-grade RESTful API built with **Node.js**, **Express**, and **MongoDB**. This project implements a secure and validated system for managing student records, featuring custom authentication logic and strict data integrity rules.

---

## 📝 Overview
This project is designed to demonstrate the core principles of backend development, including **CRUD operations**, **Schema Design**, **Request Validation**, and **Access Control**. It serves as a robust foundation for building scalable educational management tools.

---

## 🚀 Features
* **Authentication Flow**: Register and Login system to control data modification.
* **Public Access**: Anyone can view the list of students or a single student profile.
* **Restricted Actions**: Only logged-in users can **Add**, **Update**, or **Delete** student records.
* **Strict Validation**:
    * **Empty Fields**: All fields (`name`, `email`, `age`) are mandatory.
    * **Name**: Minimum length of 3 characters required.
    * **Email**: Must follow a valid email format.
    * **Age**: Must be a numeric value between 18 and 60.
* **Data Persistence**: Integrated with MongoDB Atlas for reliable cloud storage.
* **Hard Delete**: Permanent removal of records from the database.
* **Error Handling**: Comprehensive error messages for invalid IDs or unauthorized access.

---

## 📂 Folder Structure
```text
student-management-api/
├── config/
│   └── dbConfig.js      # Database connection setup
├── controllers/
│   ├── authController.js # Logic for Register, Login, and Logout
│   └── studentController.js # Logic for Student CRUD operations
├── models/
│   ├── User.js          # Mongoose Schema for Users
│   └── Student.js       # Mongoose Schema for Students
├── routes/
│   ├── authRoutes.js    # Routes for authentication
│   └── studentRoutes.js # Routes for student management
├── utils/
│   └── validation.js    # Reusable validation logic
├── app.js               # Main entry point & server configuration
├── package.json         # Project dependencies and scripts
└── data/                # (Optional) Local JSON storage backup
```

---

## 🛠 Technologies Used
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose ODM)
* **Development Tool**: Nodemon (Auto-restart)
* **API Testing**: Postman

---

## ⚙️ Installation Steps

1.  **Clone the project**:
    ```bash
    git clone https://github.com/your-username/student-management-api.git
    cd student-management-api
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Database**:
    * Open `config/dbConfig.js`.
    * Replace `YOUR_MONGODB_ATLAS_LINK_HERE` with your actual MongoDB connection string.

4.  **Update Port (Optional)**:
    * The project is configured to run on **Port 7000**. You can change this in `app.js`.

---

## 🏃 How to Run the Project

To start the server in development mode (with auto-restart):
```bash
npm run dev
```
The server will start at: `http://localhost:7000`

---

## 📡 Usage Examples (API Endpoints)

### **Authentication**
| Action | Method | Endpoint | Body (JSON) |
| :--- | :--- | :--- | :--- |
| Register | `POST` | `/auth/register` | `{"username": "admin", "password": "123"}` |
| Login | `POST` | `/auth/login` | `{"username": "admin", "password": "123"}` |
| Logout | `GET` | `/auth/logout` | None |

### **Student Management**
| Action | Method | Endpoint | Auth Required |
| :--- | :--- | :--- | :--- |
| View All Students | `GET` | `/students` | No |
| View Single Student| `GET` | `/students/:id` | No |
| Add New Student | `POST` | `/students` | **Yes** |
| Update Student | `PUT` | `/students/:id` | **Yes** |
| Delete Student | `DELETE`| `/students/:id` | **Yes** |

---

---

## 📌 Notes
* **Session Logic**: This project uses a global variable for the login state. If the server restarts or the code is saved, you must **Login again** to perform restricted actions.
* **Security**: Ensure your MongoDB URI is kept private. In production, always use an environment file.

---

## 🛠 Future Improvements
* Implement **JWT (JSON Web Tokens)** for persistent and more secure sessions.
* Add **Soft Delete** functionality (archiving instead of permanent removal).
* Integrate a **Frontend** using React.js or EJS templates.
* Add **Role-Based Access Control (RBAC)** (e.g., Admin vs Teacher roles).

---

**Developed with ❤️ by [Sushil ugale]**
