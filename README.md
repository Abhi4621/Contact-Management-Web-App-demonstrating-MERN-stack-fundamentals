# Contact Manager (MERN)

Small demo MERN app to collect and display contacts.

Structure:
- backend/ (Express + Mongoose)
- frontend/ (React + Vite)

Quick start:
1. Start MongoDB (local or Atlas). Copy `backend/.env.example` to `.env` and set `MONGO_URI`.
2. Backend:
   - cd backend
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev

API endpoints:
- GET /api/contacts
- POST /api/contacts { name, email, phone, message }
- DELETE /api/contacts/:id (optional)

Features:
- Client-side validation, server-side validation
- Contacts list updates without reload
- Delete, sorting, success message

Evaluation checklist:
- Demonstrates MERN fundamentals, clear API, schema design, simple responsive UI.
