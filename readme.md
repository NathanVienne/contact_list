# Contact Manager

A lightweight full‑stack demo project that shows how to build, persist and edit a contacts list in less than two hours.

---

## ✨ Features

| Functionality | Details |
| ------------- | ------- |
|               |         |

| **Pop‑in contact form**           | Modal dialog opens from any page; no navigation required.                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Email + postal address inputs** | New contacts require a valid e‑mail (must contain `@`, may include letters, digits, `-`, `.` only) and a postal address. |
| **Instant validation**            | The **Save** button stays disabled until the e‑mail matches the regex.                                                   |
| **Database persistence**          | On submit the backend stores: *e‑mail*, *postal address*, *client IP* and an automatic *creation date‑time*.             |
| **Toast feedback**                | Success & error toasts appear after every create / update action, based on the server response.                          |
| **Listing page**                  | Shows all contacts (most recent first). Only the postal address can be edited – e‑mail and timestamps are read‑only.     |

---

## 🏗️  Tech stack (suggested)

| Layer    | Choice                                       | Why                                                                 |
| -------- | -------------------------------------------- | ------------------------------------------------------------------- |
| Frontend | React + Vite • TailwindCSS • DaisyUI • Axios | Quick SPA setup, instant styling and accessible components.         |
| Backend  | Node.js + Express • TypeORM • SQLite         | Zero‑config file database, strongly‑typed ORM, minimal HTTP server. |

> Feel free to swap Express/TypeORM/SQLite for any other stack that fulfils the REST contract.

---

## 📁 Project structure

```
mon-app/
├─ frontend/      # React client (Vite)
│   └─ …
├─ backend/       # Express server + TypeORM entities
│   ├─ src/
│   │   ├─ entities/Contact.ts
│   │   ├─ routes/contacts.ts
│   │   └─ …
│   └─ data/db.sqlite
└─ README.md      # this file
```

---

## 🚀  Getting started (local dev)

```bash
# 1. clone the repo
$ git clone contact-list
$ cd contact-list

# 2. install and run the backend
$ cd backend
$ npm install
$ npm run dev        # http://localhost:8000

# 3. install and run the frontend in a new terminal
$ cd ../frontend
$ npm install
$ npm run dev        # http://localhost:5173
```

> **Tip:** keep `VITE_API_URL` (front) and `DATABASE_URL` (back) in `.env.development` files so you never edit code when you switch environments.

---

## 📡 REST API (minimal)

| Verb    | Route           | Body                        | Notes                                                      |
| ------- | --------------- | --------------------------- | ---------------------------------------------------------- |
| `GET`   | `/contacts`     | —                           | Returns an array of contacts, ordered by `createdAt` DESC. |
| `POST`  | `/contacts`     | `{ email, adressePostale }` | Validates e‑mail, records `ip`, `createdAt` on the server. |
| `PATCH` | `/contacts/:id` | `{ adressePostale }`        | Updates postal address only.                               |

---

## 🛡️ Next steps (beyond the MVP)

- **Input validation server‑side** (Zod/Joi).
- **CORS** & security headers (Helmet).
- **Dockerisation** with a volume‑persisted `db.sqlite`.
- **Automated tests** with Vitest + Supertest.
- **CI/CD** to build the front, run migrations and deploy.

---

## License

MIT — do what you want, learn a lot, credit appreciated!

