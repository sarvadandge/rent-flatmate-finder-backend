# 🏠 Rent & Flatmate Finder Backend

An AI-powered Rent & Flatmate Finder backend built with Node.js, Express, Prisma, PostgreSQL, Socket.IO, and Google Gemini.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Role-based Authorization

---

### Tenant

- Create Profile
- Update Profile
- Browse Listings
- AI Compatibility Score
- Express Interest

---

### Owner

- Create Listing
- Update Listing
- Delete Listing
- Upload Images
- Delete Images
- Mark Listing Filled
- View Interest Requests
- Accept / Reject Requests

---

### AI

- Google Gemini Integration
- Rule-based Fallback
- Compatibility Score Generation
- Automatic Regeneration

---

### Chat

- Chat Room Creation
- Message History
- REST Messaging
- Socket.IO Real-time Messaging

---

### Notifications

- Email when Interest Created
- Email when Interest Accepted
- Email when Interest Declined

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Socket.IO
- Cloudinary
- Google Gemini AI
- Nodemailer
- JWT
- Zod

---

## 📁 Project Structure

```text
src/
├── config/
├── constants/
├── controllers/
├── helper/
├── prompts/
├── middleware/
├── routes/
├── services/
├── sockets/
├── templates/
├── utils/
├── validators/
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/sarvadandge/rent-flatmate-finder-backend.git
```

Install dependencies

```bash
npm install
```

Copy environment variables

```bash
cp .env.example .env
```

Generate Prisma Client

```bash
npx prisma generate
```

Run the server

```bash
npm run dev
```

---

## 🐳 Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Stop

```bash
docker compose down
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL Connection String |
| JWT_SECRET | JWT Secret |
| GOOGLE_API_KEY | Gemini API Key |
| CLOUDINARY_CLOUD_NAME | Cloudinary Cloud Name |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary API Secret |
| SMTP_HOST | SMTP Host |
| SMTP_PORT | SMTP Port |
| SMTP_USER | Gmail Address |
| SMTP_PASS | Gmail App Password |

---

## 📡 API Modules

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Tenant

```
POST  /api/profile
PATCH /api/profile
GET   /api/profile
```

### Listings

```
POST   /api/listings
GET    /api/listings
GET    /api/listings/:id
PATCH  /api/listings/:id
DELETE /api/listings/:id
PATCH  /api/listings/:id/fill
POST   /api/listings/:id/images
DELETE /api/listings/images/:imageId
```

### Interests

```
POST  /api/interests/:listingId
GET   /api/interests
PATCH /api/interests/:interestId
```

### Chat

```
GET  /api/chat
GET  /api/chat/:chatRoomId/messages
POST /api/chat/:chatRoomId/messages
```

### AI

```
POST /api/ai/test
```

---

## 🔌 Socket.IO Events

### Client → Server

```
chat:join
chat:send
```

### Server → Client

```
chat:joined
chat:message
chat:error
```

---