# Saisneha College of Nursing and Health Sciences

A full-stack web platform for **Saisneha College of Nursing and Health Sciences**, featuring a responsive React frontend, a RESTful Node.js/Express API, MongoDB Atlas database, and Cloudinary media management.

---

## 🌐 Live Production Deployments

* **Frontend (Vercel):** [https://saisneha-nursing-college.vercel.app](https://saisneha-nursing-college.vercel.app)
* **Backend API (Render):** [https://saisneha-nursing-college.onrender.com](https://saisneha-nursing-college.onrender.com)
* **API Health Check:** [https://saisneha-nursing-college.onrender.com/api/health](https://saisneha-nursing-college.onrender.com/api/health)

---

## 📁 Project Structure

This repository is maintained as a monorepo containing both the client and server applications:

```
SaisnehaCollegeOfNursing/
├── backend/                  # Node.js & Express REST API
│   ├── config/               # Database connection (MongoDB Mongoose)
│   ├── controllers/          # Business logic (Auth, Courses, Faculty, Inquiries, etc.)
│   ├── middleware/           # Auth guard, error handling, input validation
│   ├── models/               # Mongoose schemas (Admin, Course, Faculty, Inquiry, etc.)
│   ├── routes/               # API route definitions
│   ├── server.js             # Express entry point & middleware setup
│   └── package.json
│
├── frontend/                 # React 19 Single Page Application (Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── admin/            # Admin dashboard and CRUD panels
│   │   ├── components/       # Reusable components (Navbar, Footer, SEO, etc.)
│   │   ├── pages/            # Public pages (Home, About, Courses, Admissions, Gallery, Contact)
│   │   ├── utils/            # Utilities (Cloudinary transforms, etc.)
│   │   ├── App.jsx           # App routing & providers
│   │   └── main.jsx          # Vite root entry
│   ├── vercel.json           # Vercel SPA routing & cache configuration
│   └── package.json
│
├── render.yaml               # Render Blueprint deployment configuration
└── README.md                 # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19, Vite 8, React Router v7
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **SEO:** React Helmet Async
* **Hosting:** Vercel

### Backend
* **Runtime:** Node.js (ES Modules)
* **Framework:** Express 4
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Media Storage:** Cloudinary
* **Security & Optimization:** Helmet, CORS, Express Mongo Sanitize, Rate Limiter, XSS-Clean, Compression, Morgan
* **Hosting:** Render

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example / Production |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `production` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT token generation | `your_strong_jwt_secret` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |
| `FRONTEND_URL` | Allowed client origin(s) for CORS | `https://saisneha-nursing-college.vercel.app` |
| `ALLOWED_ADMIN_EMAILS` | Comma-separated list of approved admin emails | `admin@saisneha.edu,principal@saisneha.edu` |

### Frontend (`frontend/.env`)

| Variable | Description | Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the live backend API | `https://saisneha-nursing-college.onrender.com` |

---

## 🚀 Local Development Setup

### Prerequisites
* **Node.js:** v18+ (v20 or v22 LTS recommended)
* **MongoDB:** Local instance or MongoDB Atlas account
* **Cloudinary:** Account for image and document uploads

### 1. Clone & Install

```bash
git clone https://github.com/arpansarangi1156-ux/Saisneha-Nursing-College.git
cd Saisneha-Nursing-College
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your credentials in backend/.env
npm run dev
```

The backend server will start on `http://localhost:5000` (or the port defined in `.env`).

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend development server will launch at `http://localhost:3005` (with proxy to backend configured in `vite.config.js`).

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and root info | Public |
| `GET` | `/api/health` | Service health status check | Public |
| `POST` | `/api/auth/login` | Admin authentication & JWT issuing | Public |
| `GET` | `/api/auth` | List all administrators | Admin Only |
| `POST` | `/api/auth/register` | Register new administrator | Superadmin |
| `GET` | `/api/courses` | List academic programs & courses | Public |
| `POST` | `/api/courses` | Create new course entry | Admin Only |
| `GET` | `/api/faculty` | List faculty profiles | Public |
| `POST` | `/api/faculty` | Add faculty member | Admin Only |
| `GET` | `/api/gallery` | Retrieve gallery photos | Public |
| `POST` | `/api/gallery` | Upload new gallery image | Admin Only |
| `POST` | `/api/inquiries` | Submit student admission inquiry | Public |
| `GET` | `/api/inquiries` | Review admission inquiries | Admin Only |
| `GET` | `/api/announcements` | Retrieve active college announcements | Public |
| `GET` | `/api/settings` | Get site contact and social settings | Public |
| `PUT` | `/api/settings` | Update site settings and metadata | Admin Only |
| `GET` | `/api/dashboard` | Aggregated metrics for admin overview | Admin Only |

---

## 🚢 Deployment Notes

* **Render (Backend):**
  * Root directory: `backend`
  * Build command: `npm install`
  * Start command: `npm start`
  * Add the environment variables specified in the backend table.
* **Vercel (Frontend):**
  * Root directory: `frontend`
  * Framework preset: `Vite`
  * Environment variable: `VITE_API_URL=https://saisneha-nursing-college.onrender.com`
  * Routing handled via `frontend/vercel.json` for SPA rewrites.
