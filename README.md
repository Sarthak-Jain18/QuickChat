# QuickChat 

**QuickChat** is a real-time **1:1 chat application** built with the **MERN stack**, **Socket.IO**, and **Tailwind CSS**, focused on learning real-time systems and strengthening full-stack skills.

---
### 🔗 Live Demo: https://quick-chat-sj.vercel.app/

## ✨ Key Features

* JWT-based authentication with **bcrypt hashing**
* Real-time **1:1 messaging** using Socket.IO
* **Image sharing** with Cloudinary
* Online / offline user status
* **Unseen** message count
* User profile updates (name, bio, profile picture)
* Error handling with toast notifications

---

## 🧠 Backend Architecture

```
Server → Router → Middleware → Controller
```

Clean separation of concerns with JWT middleware and socket token verification.

---

## 🖥️ Frontend Overview

* React + Tailwind CSS
* Context API (`AuthContext`, `ChatContext`)

### Routes

* `/` → Chat dashboard (users | chat | profile/media)
* `/login` → Login / Signup
* `/profile` → Update profile

---

## 🌍 Deployment

* **Frontend:** Vercel
* **Backend:** Render

---

## 🎯 Purpose

* Learn **Socket.IO** and real-time communication
* Improve **MERN stack** development skills
---

Thank you for exploring QuickChat! Feel free to share feedback.
