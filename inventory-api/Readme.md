# 🚀 Professional Inventory Management System (Node.js API)

A robust, secure, and scalable backend solution for managing product inventories. This project demonstrates industry-standard practices, including **MVC Architecture**, **JWT Authentication**, and **Soft-Delete** logic.

---

## 📝 Project Overview
This Inventory Management System allows authenticated users to manage their product listings efficiently. Built with the **MERN** stack (Node.js, Express, MongoDB), it focuses on data integrity by preventing unauthorized access and ensuring business rules like non-negative quantities are strictly enforced.

---

## ✨ Features
* **User Authentication**: Secure Register and Login flow using `bcrypt` for password hashing.
* **JWT Security**: Protected routes using JSON Web Tokens to ensure only authorized users can manage products.
* **Product CRUD**: Full ability to Create, Read, Update, and Delete products.
* **Soft Delete**: Products are marked as `isDeleted: true` instead of being permanently removed, preserving historical data.
* **Category Filtering**: Efficiently retrieve products based on specific categories via query parameters.
* **Input Validation**: Prevents negative stock values to maintain inventory accuracy.
* **Standardized Responses**: Consistent success and error response formats across all APIs.

---

## 📂 Folder Structure
The project follows the **Model-View-Controller (MVC)** design pattern:

```text
INVENTORY/
├── src/
│   ├── config/          # Database connection settings
│   ├── controllers/     # Request handlers (Logic Layer)
│   ├── middleware/      # JWT Authentication & Security
│   ├── model/           # Mongoose Schemas (Data Layer)
│   ├── routes/          # API Endpoint definitions
│   ├── services/        # Database queries (Service Layer)
│   ├── utils/           # Helper functions (msg, response)
│   └── app.js           # Express App configuration
├── .env                 # Environment variables (Secret Keys)
├── server.js            # Entry point for the server
└── package.json         # Project dependencies
```

---

## 🛠 Technologies Used
* **Backend**: Node.js, Express.js
* **Database**: MongoDB Atlas (Cloud)
* **ODM**: Mongoose
* **Security**: JWT (JSON Web Token), Bcrypt
* **Utilities**: Moment.js (Date formatting), Http-Status-Codes

---

## ⚙️ Installation Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/inventory-management-system.git
    cd inventory-management-system
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET_KEY=your_secret_key_here
    ```

---

## 🚀 How to Run
* **Development Mode (using nodemon):**
    ```bash
    npm run dev
    ```
* **Production Mode:**
    ```bash
    npm start
    ```

---

## 🔌 API Usage Examples

### 1. Authentication
| Action | Method | URL | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **Register** | `POST` | `/api/auth/register` | `{"username": "name", "email": "e@test.com", "password": "123"}` |
| **Login** | `POST` | `/api/auth/login` | `{"email": "e@test.com", "password": "123"}` |

### 2. Product Management (Requires Bearer Token)
| Action | Method | URL | Description |
| :--- | :--- | :--- | :--- |
| **Add Product** | `POST` | `/api/products` | Create a new inventory item |
| **View All** | `GET` | `/api/products` | Fetch all non-deleted products |
| **Filter By Cat**| `GET` | `/api/products?category=Electronics` | Filter list by category |
| **Update** | `PUT` | `/api/products/:id` | Edit product details |
| **Soft Delete** | `DELETE` | `/api/products/:id` | Set isDeleted to true |

---






---

## 📌 Future Improvements
* **Dashboard Analytics**: Visualization of stock levels.
* **File Upload**: Image support for products.
* **Export Data**: Ability to download inventory as CSV/Excel.
* **Role-Based Access**: Distinguishing between Admin and User roles.

---
