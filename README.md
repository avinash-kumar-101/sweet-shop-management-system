# Sweet Shop Management System 🍬

A full-stack Sweet Shop Management System built using **Node.js, Express, MongoDB, and React (Vite)**.

This project includes user authentication, protected routes, and product management functionality.

---

## 🚀 Features

### ✅ Backend
- User Registration & Login (JWT Authentication)
- Role-based access (Admin / Staff)
- Product CRUD APIs
- Protected routes using middleware
- MongoDB database integration

### ✅ Frontend
- Login page
- Dashboard page
- Protected routes (cannot access dashboard without login)
- Token-based authentication using LocalStorage
- React Router for navigation

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS

---

## 📂 Project Structure



sweet-shop-management-system │ ├── backend │   ├── controllers │   ├── routes │   ├── models │   ├── middleware │   └── server.js │ ├── frontend │   ├── pages │   ├── services │   ├── App.jsx │   └── main.jsx │ └── README.md

---

## ⚙️ How to Run the Project

### Backend
```bash
cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev


---

🔐 Authentication Flow

User logs in

JWT token is stored in browser

Protected routes are accessible only after login

Logout clears token and redirects to login page



---

📌 Status

✅ Backend APIs ready
✅ Frontend authentication complete
✅ Protected routes working
⏳ Product UI can be extended further


---

👨‍💻 Author

Avinash Kumar
B.Tech CSE | Full Stack Developer (MERN)

---