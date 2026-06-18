# Saisneha College of Nursing

This repository contains the source code for the Saisneha College of Nursing platform. It is structured as a monorepo containing both the React frontend and Node.js backend.

## Project Structure

- `/frontend` - React SPA (Vite, TailwindCSS)
- `/backend` - Express REST API (Node.js, MongoDB)

## Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary Account

### Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials.
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env` and configure `VITE_API_URL` if testing against a live backend, otherwise the proxy will handle local routing.
4. `npm run dev`

## Deployment
- **Frontend** is optimized for Vercel deployment.
- **Backend** is optimized for Render/Heroku deployment.
