# Contact Backend

Simple Express + Mongoose backend for Contact Management app.

Scripts:
- npm install
- npm run dev  (requires nodemon)
- npm start

Environment: copy `.env.example` to `.env` and set `MONGO_URI`.

API:
- GET /api/contacts
- POST /api/contacts  (JSON body: name, email, phone, message)
- DELETE /api/contacts/:id
