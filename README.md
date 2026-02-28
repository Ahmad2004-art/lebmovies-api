🎬 LebMovies API
📌 Overview

LebMovies API is a secure RESTful backend service built for a movie streaming platform.

The system provides authentication, role-based access control, and full CRUD operations for managing movies and users. It is designed following REST principles and focuses on secure user management and scalable backend structure.

🧠 Problem Statement

Modern streaming platforms require:

Secure authentication systems

Role-based authorization

Structured content management

Reliable database integration

This project demonstrates backend engineering skills by implementing a secure and structured API architecture.

🏗 Architecture

The system follows a layered backend structure:

Routes → Define API endpoints

Controllers → Handle request logic

Middleware → Authentication & Authorization

Database Layer → MySQL queries

File Handling → Image uploads using Multer

Authentication is handled using JWT tokens and secure password hashing via bcrypt.

🚀 Features

✔ User authentication (JWT-based login system)
✔ Role-based access control (Admin / User)
✔ Movies CRUD operations
✔ User profile management
✔ Admin panel functionality
✔ Secure password hashing (bcrypt)
✔ File uploads using Multer
✔ MySQL relational database integration

🔐 Security Features

Password hashing using bcrypt

JWT token verification middleware

Protected admin-only routes

Input validation and structured error handling

⚙ Tech Stack

Node.js

Express.js

MySQL

JWT

bcrypt

Multer

HTML, CSS, JavaScript

📂 Project Structure
lebmovies/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── uploads/
│   ├── server.js
│   └── package.json
▶ Run Locally
cd lebmovie/lebmovie/backend
npm install
node server.js

Server will start on:

http://localhost:PORT

🔮 Future Improvements

Add pagination and filtering for movies

Implement refresh tokens

Add rate limiting for API protection

Deploy using Docker

Add Swagger API documentation

Integrate cloud storage for file uploads
