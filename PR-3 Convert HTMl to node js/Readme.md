✨ User Login & Register System — Node.js + Express + EJS

A simple, beginner-friendly, clean Node.js project that demonstrates:

✔ Login
✔ Register
✔ View all users
✔ Back to login
✔ In-memory user storage

No delete feature included (as requested).

📁 Project Structure
project-root/
│
├── server.js
├── package.json
├── package-lock.json
│
├── css/
│   └── styles.css
│
└── views/
    ├── login.ejs
    ├── registerPage.ejs
    └── userData.ejs

🚀 Features
🔐 Login Page

demo output -



![output](https://github.com/user-attachments/assets/a7994180-cd20-48c7-9f90-816e58202add)








User enters email + password

If valid → User list page

If invalid → Redirects to Register page

📝 Register Page

Add new users

New users are stored in memory

Auto-generated numeric ID

👥 User Data Page

Displays ID, Name, Email of all users

Clean table design

Logout button returns to login

🎨 UI Styling

Purple login button

Modern container

Neat spacing

Responsive table

Connected via /css/styles.css

⚙️ Tech Stack
Technology	Purpose
Node.js	Runtime
Express.js	Routing & server
EJS	View templates
CSS	Styling
In-Memory Array	Store users temporarily
🧩 Routes Overview
Route	Method	Description
/	GET	Login page
/loginUser	POST	Validate login
/registerPage	GET	Registration form
/addUser	POST	Add new user
/backUser	GET	Logout → back to login
▶️ How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Start the server
node server.js

3️⃣ Open in browser
http://localhost:10000

🔑 Sample Login Credentials
Email	Password
sushilugale040@gmail.com	1234

You may register new users anytime.

📌 Important Notes

Users are not saved permanently; app restart resets data.

Passwords are plaintext — not for real-world use.

Great for students learning:

Express routing

Form handling

EJS templates

Serving static files

🌟 Future Upgrades Available (Your Choice)

I can add:

✨ Proper login session
✨ MongoDB database
✨ Update / Delete user
✨ Beautiful UI using Bootstrap / Tailwind
✨ Validation alerts
✨ Toast notifications

Just tell me — mai turant add kar dunga!
