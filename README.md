# mockT-app
mockT-app/
├── client/     # frontend (React + Vite)
├── server/     # backend (Express + MongoDB)


# frontend
client/
├── index.html
├── src/
│   ├── components/    # Reusable UI parts
│   ├── pages/         # Page-level components
│   ├── App.jsx        # Main app wrapper
│   └── main.jsx       # Entry point
├── package.json


# backend
server/
├── config/            # Database and configuration files
│   └── db.js          # MongoDB connection setup
│
├── controllers/       # Route controllers (business logic)
│   └── userController.js
│
├── models/            # Mongoose models (MongoDB schemas)
│   └── User.js
│
├── routes/            # Express route definitions
│   └── userRoutes.js
│
├── middleware/        # Custom middleware (auth, error handling, etc.)
│   └── authMiddleware.js
│
├── .env               # Environment variables (DB URI, PORT, etc.)
├── server.js          # Entry point for the backend
├── package.json       # Backend dependencies
└── README.md          # Backend documentation
