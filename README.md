# 🚀 DevTinder Frontend

A Tinder-style platform for developers to discover, connect, and collaborate based on shared skills and interests.

## ✨ Features

- 👤 Developer profile creation
- 🔍 Swipe-based match discovery
- 💡 Skill-based filtering
- 🔐 Login/Signup with cookie-based JWT auth
- 🍪 Authenticated sessions via `httpOnly` cookies
- ⚛️ Redux for state management
- 🌈 Tailwind CSS for modern styling

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit, Axios
- **Auth:** JWT + Cookies (`withCredentials` support)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/devtinder-frontend.git
cd devtinder-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
VITE_BASE_URL=http://localhost:3000
```

> Or use your backend URL if deployed.

### 4. Run the app

```bash
npm run dev
```

---

## ✅ API Routes (Backend)

| Route         | Method | Description            |
|---------------|--------|------------------------|
| `/signup`     | POST   | Register a new user    |
| `/login`      | POST   | Login user, set cookie |
| `/logout`     | POST   | Clear JWT cookie       |
| `/`  | GET    | Get swipeable users    |

---

## 📌 Important Notes

- `withCredentials: true` is required for Axios requests to send cookies.
- Ensure the backend CORS is configured correctly for `http://localhost:5173`.

---

## 📜 License

This project is licensed under the ![License](https://img.shields.io/badge/license-MIT-blue.svg)

---
