# Zomato Clone Project

A full-stack, scalable online food delivery web application inspired by Zomato. This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and includes features like user authentication, image uploading, and a RESTful API backend structure.

## 🚀 Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **React Router Dom** (For client-side routing)
- **Axios** (For HTTP requests)
- **React Icons** (For UI icons)

### Backend
- **Node.js** & **Express.js** (Server infrastructure)
- **MongoDB** & **Mongoose** (Database ORM)
- **JSON Web Token (JWT)** (For secure user authentication)
- **Bcrypt.js** (For password hashing)
- **ImageKit** & **Multer** (For handling and uploading image assets)
- **Cors** & **Cookie-Parser** (For middleware and cross-origin resource sharing)
- **Dotenv** (For environment variable management)

## 📂 Project Structure

```
Zomato Project/
│
├── backend/                  # Server-side code
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   ├── server.js             # Main entry point for the server
│   └── src/                  # Backend source code
│       ├── app.js            # Express app setup
│       ├── controller/       # Request handlers
│       ├── db/               # Database connection setup
│       ├── middlewares/      # Express middlewares (e.g., auth, multer)
│       ├── models/           # Mongoose schemas/models
│       ├── routes/           # API route definitions
│       └── service/          # Business logic and external services
│
├── frontend/                 # Client-side code (React + Vite)
│   ├── index.html            # Public HTML template
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite bundler configuration
│   └── src/                  # Frontend source code
│       ├── App.jsx           # Main React component
│       ├── main.jsx          # React DOM rendering entry point
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page-level components
│       ├── routes/           # Frontend routing logic
│       ├── styles/           # CSS stylesheets
│       └── assets/           # Static assets (images, icons)
│
└── README.md                 # Project documentation
```

## ⚙️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance running locally or on MongoDB Atlas
- [ImageKit](https://imagekit.io/) account for image uploads

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd "Zomato Project"
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add your environment variables (e.g., MongoDB URI, JWT Secret, ImageKit keys, Port). 

Start the development server:
```bash
npm start
```

### 3. Setup the Frontend
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

## ✨ Features (In Progress / Implemented)
- Complete MVC Architecture in backend.
- Secure User Authentication via JWT & cookies.
- Media upload using Multer and ImageKit.
- Modular React frontend built with Vite for fast HMR.
