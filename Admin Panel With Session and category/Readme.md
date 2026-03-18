# **ADMIN PANEL WITH MULTI-LEVEL CATEGORIZATION**

A robust, professional-grade backend management system built with the **Node.js, Express, and MongoDB (MERN stack focus)**. This project provides a comprehensive dashboard for managing products with a deep hierarchical structure, including Categories, Sub-categories, and Extra-categories.

---

## **Overview**
This Admin Panel is designed to handle complex inventory and data management tasks. It follows the **MVC (Model-View-Controller)** architecture to ensure scalability and clean code management. With integrated authentication, file uploading, and flash notifications, it provides a seamless experience for administrators to manage a digital storefront or inventory system.

---

## **Key Features**
* **Multi-Level Category Management:** Organize data into Categories, Sub-categories, and Extra-categories.
* **Full CRUD Operations:** Create, Read, Update, and Delete functionality for all modules.
* **Secure Authentication:** Implementation of `passport-local` for secure admin login and session management.
* **Image Uploading:** Integrated `Multer` middleware for handling product and profile image uploads.
* **Flash Notifications:** Real-time feedback for user actions using `connect-flash`.
* **Dynamic UI:** Server-side rendering using **EJS** for a fast and interactive dashboard.
* **Clean Architecture:** Separated concerns for database configuration, business logic, and routing.

---

## **Folder Structure**
```text
ADMIN-PANEL/
├── config/                 # Database and environment configurations
│   └── db.config.js
├── controllers/            # Business logic for all modules
│   ├── admin.controller.js
│   ├── category.controller.js
│   ├── extracategory.controller.js
│   ├── product.controller.js
│   └── subcategory.controller.js
├── middleware/             # Custom middlewares (Auth, Uploads, Alerts)
│   ├── connectFlash.middleware.js
│   ├── multer.middleware.js
│   └── passport.local.middleware.js
├── model/                  # Mongoose schemas and data models
│   ├── admin.model.js
│   ├── category.js
│   ├── extracategory.model.js
│   ├── product.model.js
│   └── subcategory.model.js
├── routes/                 # Express routes for API endpoints
│   ├── admin.route.js
│   ├── category.route.js
│   ├── extraCategory.route.js
│   ├── product.route.js
│   ├── subcategory.route.js
│   └── index.js
├── uploads/                # Directory for stored images/assets
│   └── admin/
├── views/                  # EJS templates for the frontend
│   ├── admin/
│   ├── auth/
│   ├── category/
│   ├── extracategory/
│   ├── product/
│   ├── subCategory/
│   ├── dashboard.ejs
│   ├── header.ejs
│   └── footer.ejs
├── node_modules/           # Project dependencies                    
└── server.js               # Entry point of the application
```

---

## **Technologies Used**
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **View Engine:** EJS (Embedded JavaScript)
* **Authentication:** Passport.js (Local Strategy)
* **File Handling:** Multer
* **Middleware:** Connect-Flash, Cookie-Parser, Express-Session
* **Styling:** CSS3, Bootstrap / Custom CSS

---

## **Installation Steps**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory and add your connection string:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_secret_key
    ```

---

## **How to Run the Project**

* **For Development (using nodemon):**
    ```bash
    npm run dev
    ```
* **For Production:**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:3000`.

---

## **Usage Examples**
1.  **Login:** Access the `/auth` route to log in as an administrator.
2.  **Manage Categories:** Navigate to the Category section to define top-level groups.
3.  **Add Products:** Use the Product module to upload items, assigning them to specific Sub and Extra categories.
4.  **Profile Update:** Admins can update their personal details and profile pictures via the Profile view.

---

## **Screenshots Section**
| Dashboard Overview | Category Management | Product List |
| :--- | :--- | :--- |
| ![Dashboard Placeholder] | ![Category Placeholder] | ![Product Placeholder] |

---

## **Notes**
* Ensure MongoDB is running locally or provide a valid MongoDB Atlas URI in the config.
* The `uploads/` folder must have write permissions for image processing to work correctly.

---

## **Future Improvements**
* **Advanced Analytics:** Integration of charts (Chart.js) to visualize sales or inventory data on the dashboard.
* **Role-Based Access (RBAC):** Adding "Super-Admin" and "Editor" roles for granular control.
* **API Integration:** Developing a RESTful API version for mobile application support.
* **Search & Export:** Adding functionality to export product lists to CSV/Excel.

---
*Developed with ❤️ by a MERN Stack Enthusiast.*
