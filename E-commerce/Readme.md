# **Core Management System API**

A premium, high-performance backend solution designed for **Admin**, **User**, and **Category** management. This project serves as a robust foundation for modern web applications, focusing on scalable architecture, secure authentication, and optimized data flow.

---

## **🚀 Features**

### **1. Admin & User Authentication**
* **Secure Login:** JWT-based authentication for both Admin and User roles.
* **Role-Based Access (RBAC):** Strict middleware-level checks to ensure only Admins can access management routes.
* **Profile Management:** Comprehensive user data handling with secure password hashing.

### **2. Dynamic Category Engine**
* **Full CRUD:** Create, Read, Update, and Delete operations for system categories.
* **Soft Delete:** Data safety mechanism using `isDelete` flags instead of permanent removal.
* **Media Integration:** Support for category-specific icons and images via Multer.

### **3. Professional Backend Utilities**
* **Standardized Responses:** Unified JSON structure for all API successes and errors.
* **Smart Timestamps:** Accurate logging of data creation and updates using `moment.js`.
* **Modular Services:** Separation of business logic from controllers for better maintainability.

---

## **📁 Folder Structure**

```bash
E-COMMERCE
└── src
    ├── config          # Database connection (db.config.js)
    ├── controller      # Request handling logic
    │   ├── auth        # Admin & User controllers
    │   └── category    # Category management logic
    ├── middleware      # Auth guards & Storage (Multer) setup
    ├── model           # Mongoose schemas (Admin, User, Category)
    ├── routes          # API endpoints (Auth, Category, Index)
    ├── services        # Core business logic (Admin, User, Category)
    ├── utils           # Helper functions & response wrappers
    └── server.js       # Application entry point
├── .env                # Environment variables
├── package.json        # Project dependencies
└── package-lock.json   # Dependency lock file
```

---

## **🛠️ Technologies Used**

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript Runtime |
| **Express.js** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM for Data Modeling |
| **JWT** | Secure Authentication |
| **Multer** | File Upload Handling |
| **Moment.js** | Date & Time Formatting |

---

## **⚙️ Installation & Setup**

### **1. Clone the repository**
```bash
git clone https://github.com/sushil9011/Node-JS.git
cd Node-JS
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4. Run the Project**
```bash
# For development (Auto-reload)
npm run dev

# For production
npm start
```

---

## **📖 Usage Examples**

### **Add New Category (Admin Only)**
**Endpoint:** `POST /api/category/`  
**Headers:** `Authorization: Bearer <Admin_Token>`  
**Body (form-data):**
* `name`: "Electronics"
* `category_image`: [File Upload]

### **Delete Category**
**Endpoint:** `DELETE /api/category/:id`  
**Description:** Performs a soft delete by updating the `isDelete` flag to `true`.

---

## **📝 Notes**
* Ensure MongoDB is running before starting the server.
* The `uploads/` folder must have write permissions for image storage.
* Default port is set to `5000` but can be configured in `.env`.

---

## **🔮 Future Improvements**
* [ ] Implementation of nested sub-categories.
* [ ] Advanced dashboard analytics for Admin users.
* [ ] Integration with Cloudinary for cloud-based image storage.
* [ ] Unit testing for core services using Jest.

---

**Developed with ❤️ for Portfolio 2026**
