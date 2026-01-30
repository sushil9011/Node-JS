# 🚀 Admin Hub | Premium Node.js Management System

A robust, professional-grade Administrative Control Panel built with **Node.js** and **Express**. This project features a sophisticated user interface, secure authentication, and a full suite of CRUD operations designed to manage administrative staff with a luxury aesthetic.

---

## 📖 Overview

**Admin Hub** is a comprehensive management solution designed for scalability and ease of use. It provides a centralized dashboard to register, view, update, and manage system administrators. The project emphasizes clean code architecture, responsive design, and a premium "glassmorphism" UI, making it an ideal starter for enterprise-level internal tools.

---

## ✨ Features

* **Secure Authentication:** Full login/logout flow with password encryption.
* **Executive Dashboard:** Real-time statistics and system overview.
* **Advanced CRUD:** Complete management of admin profiles including image uploads.
* **Premium UI/UX:** Responsive layouts, luxury headers, and interactive action buttons.
* **Profile Integrity:** Visual progress tracking for profile completion.
* **Search & Filter:** Easily navigate through the system directory.
* **Password Management:** Secure routes to update authentication credentials.

---

## 📂 Folder Structure

Based on the project architecture:

```text
Admin-Panel/
├── config/             # Database configuration (db.config.js)
├── controllers/        # Logic for handling routes (admin.controller.js)
├── model/              # Mongoose schemas (admin.model.js)
├── node_modules/       # Project dependencies
├── routes/             # Express route definitions (index.js)
├── uploads/            # Static storage for profile images
├── views/              # EJS templates (Frontend)
│   ├── admin/          # Admin CRUD (add, edit, view pages)
│   ├── auth/           # Login, OTP, and Password recovery
│   ├── profile/        # Admin personal profile views
│   ├── dashboard.ejs   # Main system overview
│   ├── header.ejs      # Reusable navigation
│   └── footer.ejs      # Reusable footer
├── package.json        # Dependencies and scripts
└── server.js           # Entry point of the application

```

---

## 🛠 Technologies Used

| Category | Technology |
| --- | --- |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Frontend** | EJS (Embedded JavaScript), CSS3, Bootstrap 5 |
| **Auth** | Passport.js, Bcrypt |
| **Icons** | Material Design Icons (MDI) |

---

## ⚙️ Installation Steps

1. **Clone the Repository**
```bash
https://github.com/sushil9011/Node-JS/tree/master/Admin%20panel

```


2. **Install Dependencies**
```bash
npm install

```


3. **Setup Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

```


4. **Database Connection**
Ensure your MongoDB service is running locally or via Atlas.

---

## 🚀 How to Run

To start the server in development mode:

```bash
node server.js

```

The application will be available at `http://localhost:3000`.

---

## 💻 Usage Examples

### Adding a New Admin

Navigate to the "Register New Admin" section, fill in the details (First Name, Email, Phone, etc.), upload a profile picture, and save.

### Managing Directory

Use the **System Directory** to view all active admins. Admins with specific privileges can Edit or Delete profiles directly from the table.

---

## 📸 Screenshots

> *Place your project screenshots here to showcase the UI.*

| Dashboard View | System Directory | Admin Profile |
| --- | --- | --- |
|  |  |  |

---

## 📝 Notes

* **Responsiveness:** The UI uses custom CSS media queries to ensure the table and profile cards adapt to mobile devices.
* **Security:** Profile images are stored in the `/uploads` directory; ensure proper read/write permissions are set on the server.

---

## 🚀 Future Improvements

* **Role-Based Access Control (RBAC):** Implementing different permission levels (Super Admin vs. Editor).
* **Dark Mode:** Adding a toggle for low-light environments.
* **Export Data:** Options to export the Admin list to Excel or PDF.
* **Email Notifications:** Sending welcome emails upon admin registration using Nodemailer.

---

### 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/sushil9011/Node-JS/issues).

---

**Developed with ❤️ by [Sushil]**
