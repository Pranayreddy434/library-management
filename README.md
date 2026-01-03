

https://github.com/user-attachments/assets/5d256b8f-3c59-4872-96ac-3dc0be4777f7

📚 Library Booking System — Full-Stack Application
🚀 React + Vite + Material UI | Spring Boot 3.3 | JWT Auth | MySQL | Open Library API

A full-stack web application that allows users to:

✔ Browse and reserve books
✔ Manage user accounts
✔ Administrators can manage books, reservations, and import books from Open Library API
✔ JWT-secured REST API with role-based access
✔ Modern Admin Dashboard using Material UI

🧩 Tech Stack
Layer	Technologies
Frontend	React, Vite, Material UI, Axios, JWT Auth
Backend	Spring Boot 3.3, Spring Security, JPA/Hibernate
DB	MySQL
External API	Open Library API (Book search + auto import)
Auth	JSON Web Tokens (JWT)
Build Tools	Maven, Node.js
✨ Key Features
🔐 Authentication

JWT-based login & registration

Protected routes

Role-based access: USER & ADMIN

📚 Books Management

Browse & search books (public)

Reserve books (authenticated users)

Admin — Add / Edit / Import Books

🛠 Admin Dashboard

Manage reservations

Manage users

View book availability

Import books with covers from Open Library

🔔 Notification System (Optional Future Extension)

Due reminders

Reservation approvals

📁 Project Structure
library-booking-system/
│
├── backend/                     # Spring Boot REST API
│   ├── src/main/java/com/library
│   │   ├── auth/                # Login / Register + JWT
│   │   ├── book/                # Book entity/service/controller
│   │   ├── admin/               # Admin operations (search external/import)
│   │   ├── reservation/         # Reservation logic
│   │   ├── config/              # Security config, filters, beans
│   └── src/main/resources/
│       ├── application.properties
│       ├── data.sql             # Seed data for demo
│
├── frontend/                    # Vite + React + MUI UI
│   ├── src/
│   │   ├── pages/               # Login, Books, Reservations, Admin, etc.
│   │   ├── components/          # Layout & ProtectedRoute
│   │   ├── api/axiosClient.js
│   │   ├── context/AuthContext
│   ├── vite.config.js
│   ├── index.html
│
└── README.md                    # You are here

⚙️ Backend Setup (Spring Boot)
1️⃣ Database Setup (MySQL)

Create a database:

CREATE DATABASE library_db;

2️⃣ Update DB credentials

File: backend/src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Secret for JWT signing
jwt.secret=mysupersecretkey
jwt.expiration=86400000

3️⃣ Run Backend
cd backend
mvn clean install
mvn spring-boot:run


📌 Server runs at:
➡ http://localhost:8080

🔐 Login credentials (seeded in data.sql)

Email	Password	Role
admin@library.com
	admin123	ADMIN
john@example.com
	user123	USER
🎨 Frontend Setup (React + Vite)
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Run client
npm run dev


🌍 UI runs at:
➡ http://localhost:5173

🎯 API proxy is configured in vite.config.js:

server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
    }
  }
}

🛠 REST API Overview
Authentication
Method	Endpoint	Role
POST	/api/auth/register	PUBLIC
POST	/api/auth/login	PUBLIC
Books
Method	Endpoint	Role
GET	/api/books?page=0&size=20	PUBLIC
GET	/api/books/{id}	PUBLIC
POST	/api/admin/books	ADMIN
Reservations
Method	Endpoint	Role
POST	/api/reservations?bookId={id}	USER
GET	/api/users/{id}/reservations	USER
GET	/api/admin/reservations	ADMIN
Admin Book Import
Method	Endpoint	Description
GET	/api/admin/books/search-external?query=java	Search Open Library
POST	/api/admin/books/import	Import from external search
📝 Data Seeding

Books, Admin, and Users are auto-created using:

📌 backend/src/main/resources/data.sql

You can modify or add more books for testing.

📸 Screenshots (Add later)
Page	Screenshot
Login Page	(insert image here)
Books Page	(insert image here)
Admin Import Books	(insert image here)
🚀 Deployment Guide
Deployment	Tech
Frontend	Deploy to Vercel / Netlify
Backend	Deploy to Render / AWS / Railway
Database	Hosted MySQL (PlanetScale, AWS RDS, ClearDB)

⚠️ When deploying frontend: update proxy or full API URL in axios:

const api = axios.create({
  baseURL: "https://your-backend-url/api",
});

🧪 Testing (Optional Add-on)

You can add Postman collection:

/docs/LibraryBookingSystem.postman_collection.json

Includes:

Login

JWT auth tests

Import book test

🧑‍💻 Author

Developed by: Pranay Reddy
Tech Stack: Java | Spring Boot | React | MySQL
🚀 Motivation: Simplify library reservation experience

🏁 Status

✔ MVP Complete
🔄 Enhancements in progress…

Suggested future upgrades:

Email notifications

Book return workflow + fines

Dashboard charts for admins

Elastic search for better indexing
