# Contact Project

Simple MERN-style contact manager demo (Express + MongoDB backend, Vite + React frontend).

Quick start

- Backend:
  - cd backend
  - npm install
  - npm run dev
  - Required env: `MONGO_URI` (MongoDB connection string)

- Frontend:
  - cd frontend
  - npm install
  - npm run dev
  - Optional env for production: `VITE_API_URL` (set to your backend URL)

Deployment hints

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Heroku
- Database: MongoDB Atlas

Connect to MongoDB Atlas (Free tier) 🔗

1. Create a MongoDB Atlas account and create a **Free (M0)** cluster (this incurs no charge).
2. In Atlas > Database Access, create a user (username and password). Save the password.
3. In Atlas > Network Access add an IP allowlist entry (for testing you can use `0.0.0.0/0` to allow all IPs, but it's safer to add your IP). 
4. In Atlas > Clusters click **Connect** > **Connect your application** and copy the connection string; it looks like:

   mongodb+srv://<user>:<password>@cluster-url.mongodb.net/<dbname>?retryWrites=true&w=majority

5. Replace `<password>` with your DB user password and set the desired DB name (example here uses `contacts_db`).
6. Locally: copy `backend/.env.example` to `backend/.env` and update `MONGO_URI` with your Atlas URI.

Example (do NOT share your real password):

MONGO_URI=mongodb+srv://abhipandey4621:<db_password>@abhi123.pw6snzf.mongodb.net/contacts_db?retryWrites=true&w=majority

7. Start the backend:
   - cd backend
   - npm install
   - npm run dev
   - You should see `Connected to MongoDB` in the server logs.

Deployment notes

- When deploying the backend (Render/Railway/Heroku), set `MONGO_URI` as an environment variable in the service settings — do not store passwords in the repo.
- For the frontend, set `VITE_API_URL` to your backend URL (e.g., `https://your-backend.onrender.com`) so the app calls the deployed API.

Avoid charges ⚠️

- Use the Free (M0) cluster and avoid enabling paid features like backups or larger cluster sizes.
- Monitor data usage in Atlas and delete the cluster when not in use.

That's it — if you want, I can add a tiny script to create `backend/.env` from `backend/.env.example` (interactive) or help you connect a deployed backend to the frontend.