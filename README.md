# 📱 Telgramy – Realtime Chat App

**Telgramy** is a modern, full-stack realtime chat application built with powerful technologies. Users can chat in realtime, switch between light and dark themes, update their profile picture, and see a live list of online users with filter capabilities.

---

## 🔥 Features

- 💬 Realtime messaging with WebSockets
- 🌗 Light & Dark mode toggle
- 🖼️ Profile picture upload via Cloudinary
- 🧑‍🤝‍🧑 Online users list with filters
- 🍪 Cookie-based session handling
- 🔐 Secure authentication with bcrypt
- ⚡ Blazing fast frontend with React + Vite
- 🎨 Beautiful UI with TailwindCSS + DaisyUI

---

## 🛠️ Tech Stack

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB (Mongoose)** – NoSQL database
- **bcrypt** – Password hashing
- **Cloudinary** – Image hosting
- **Socket.IO** – Realtime communication
- **Cookies** – User sessions
- **CORS** – Frontend-backend integration

### Frontend
- **React (Vite)** – UI Library + fast build tool
- **Tailwind CSS** – Utility-first CSS
- **DaisyUI** – Prebuilt Tailwind components
- **Socket.IO Client** – Realtime messaging
- **Zustand** – Global state management

---

## 📸 Screenshots

<!-- Add screenshots when available -->
> Coming soon...

---

## 🚀 Getting Started

### 📦 Clone the repository
```bash
git clone https://github.com/your-username/telgramy.git
cd telgramy
```
### 🔧 Backend Setup
```bash
cd server
npm install
npm run dev
```
### .env File
```bash
PORT=3000
CONNECTION_STRING=coonection for database
JWT_SECRET=123
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
NODE_ENV=development
CLOUDINARY_NAME=your name
CLOUDINARY_API_KEY=your key
CLOUDINARY_API_SECRET=your secret
```

### 🎨 Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 📁 Client Folder Structure

```bash
Client/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── skeletons/
│   │   │   ├── MessageSkeleton.jsx
│   │   │   ├── SideBarSkeleton.jsx
│   │   ├── AuthImagePattern.jsx
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── MessageInput.jsx
│   │   ├── Navbar.jsx
│   │   ├── SideBar.jsx
│   ├── lib/
│   │   ├── axios.js
│   │   ├── utils.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── SignUp.jsx
│   ├── store/
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
```

## 📁 Server Folder Structure

```bash
Server/
├── controllers/
│   ├── AuthController.js
│   ├── MessageController.js
├── LIB/
│   ├── cloudinary.js
│   ├── db.js
│   ├── socket.js
│   ├── utils.js
├── middlewares/
│   ├── auth.middleware.js
├── models/
│   ├── messageModel.js
│   ├── userModel.js
├── node_modules/
├── Routes/
│   ├── authRoute.js
│   ├── messgaeRoute.js
├── seeds/
│   ├── user.seed.js
├── src/
│   ├── index.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
```
    



