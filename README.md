# MERN Issue Tracker

A full-featured issue & project tracker built with the MERN stack (MongoDB, Express, React, Node.js).  
Organize projects, create & manage tickets with Kanban drag-and-drop, assign team members, comment on tickets, and handle authentication & authorization.

---

## 🚀 Features

- **User Authentication**  
  - JWT-based signup & login  
  - Role support (user vs. admin)
- **Project Management**  
  - Create, update, delete projects  
  - Invite team members by email  
- **Ticket Kanban Board**  
  - Create, edit, delete & assign tickets  
  - Drag-and-drop between “To Do / In Progress / Done”  
  - Priority filtering, search, and live updates  
- **Comments**  
  - Threaded comments per ticket  
  - Timestamp & author metadata  
- **Settings & Profile**  
  - View your profile  
  - Toggle light/dark theme  
  - Logout functionality  
- **API Security**  
  - Protected routes with JWT  
  - Role-based authorization middleware

---

## 🛠 Tech Stack

| Frontend          | Backend            | Database     | Authentication        |
| ----------------- | ------------------ | ------------ | --------------------- |
| React (18)        | Node.js (v18+)     | MongoDB Atlas| JSON Web Tokens (JWT) |
| Tailwind CSS      | Express            |              | bcryptjs              |
| react-router-dom  | Mongoose           |              | nodemailer (email)    |
| react-beautiful-dnd|                    |              |                       |

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v16+  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- A MongoDB Atlas cluster or local MongoDB  

---

## ⚙️ Environment Variables

Create a `.env` in `server/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

├── client/           # React + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── server/           # Express + Mongoose backend
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json


