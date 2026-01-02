# Contact Manager (MERN)

Small demo MERN app implementing basic contact collection and display.

## ✅ Implemented
- **Backend:** Express + Mongoose
  - Endpoints: `GET /api/contacts`, `POST /api/contacts`, `DELETE /api/contacts/:id`
  - Mongoose model: `Contact` (fields: **name***, **email**, **phone***, **message**, **createdAt**)
- **Frontend:** React (Vite)
  - Components: `ContactForm` (client-side validation, submit disabled when invalid, success message), `ContactList` (display contacts, delete, basic sorting)
- Behavior: Client-side and server-side validation; contacts list updates without page reload.

---

## ⚙️ Quick setup (local development)
1. Start MongoDB (either locally with `mongod`, Docker, or use MongoDB Atlas). Copy `backend/.env.example` to `.env` and set `MONGO_URI`.
2. Backend:
   - cd backend
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
   - Open the Vite URL (typically `http://localhost:5173`)

---

## 🔐 Crucial security & git notes
- **Do NOT commit** `.env` or any file containing credentials. Keep `.env` listed in `.gitignore` (already added).
- Keep a template like `.env.example` in the repo (no real secrets).
- If secrets were accidentally committed: rotate credentials **immediately**, remove the file from history (BFG or `git filter-repo`), and force-push only after coordinating with collaborators.
- For deployments / CI, use **GitHub Secrets** or equivalent and reference them in your workflow; never hardcode secrets in source.

---

## 🔧 Environment variables
- `MONGO_URI` — MongoDB connection string (e.g. Atlas):
  `mongodb+srv://<user>:<password>@cluster0.abcd.mongodb.net/contacts_db?retryWrites=true&w=majority`
- `PORT` — Backend port (default `5000`)
- `VITE_API_URL` — Frontend API base URL (default `http://localhost:5000`)

Store sensitive values in `backend/.env` (ignored by git).

---

## 🐞 Troubleshooting (common issues)
- **Backend crashes with `ECONNREFUSED 127.0.0.1:27017`**: MongoDB is not running locally. Start `mongod`, use Docker, or switch to Atlas and set `MONGO_URI`.
- **Atlas connection errors**: Ensure DB user and password are correct, your IP is whitelisted (Network Access), and the cluster has finished provisioning.
- **CORS or API errors**: Verify `VITE_API_URL` and backend `PORT` are consistent.
- To test API endpoints manually:
  - GET contacts: `curl http://localhost:5000/api/contacts`
  - POST contact (curl): `curl -X POST http://localhost:5000/api/contacts -H "Content-Type: application/json" -d '{"name":"Test","phone":"12345"}'`
  - POST contact (PowerShell): `Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/contacts -ContentType 'application/json' -Body '{"name":"Test","phone":"12345"}'`

---

## 🧾 API summary
- POST /api/contacts
  - Body: `{ name: string (required), email?: string, phone: string (required), message?: string }`
  - Success: `201 Created` with JSON contact object `{"_id":...,"name":...,"phone":...,"createdAt":...}`
- GET /api/contacts
  - Returns array of contacts sorted by `createdAt` (newest first)
- DELETE /api/contacts/:id
  - Deletes by Mongo `_id` (returns `{ success: true }`)

---

## 💾 Data model (Mongoose)
Contact schema:
- `name`: String (required)
- `email`: String
- `phone`: String (required)
- `message`: String
- `createdAt`: Date (default: now)

---

## 📦 Notes & next steps
- Repo initialized with `.gitignore` to exclude `.env` and `node_modules`.
- If you want, I can:
  - push the repo to GitHub for you, or
  - add Docker Compose to run MongoDB + backend for local dev.

---

*If you want any particular detail added or specific example workflows (Docker, CI), tell me and I’ll add it.*
