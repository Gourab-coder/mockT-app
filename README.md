# MockT-App: A Full-Stack Mock Test Platform

A complete MERN stack application designed for creating, managing, and taking mock tests. This platform provides a seamless experience for both administrators who create tests and users who take them.

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://your-vercel-deployment-link.vercel.app)
[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE)

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🚀 Live Demo

You can view the live deployed application here:

**[https://your-vercel-deployment-link.vercel.app](https://your-vercel-deployment-link.vercel.app)**

*(Replace the link above with your actual Vercel deployment URL after deploying.)*

---

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT.
- **Test Taking**: Users can browse and take available mock tests.
- **Timed Quizzes**: Each test has a timer to simulate a real exam environment.
- **Instant Results**: View scores and performance immediately after test submission.
- **Admin Dashboard**: (Optional) A separate interface for admins to create and manage tests and questions.
- **Responsive Design**: Fully responsive UI/UX built with Material-UI for a great experience on any device.

---

## 🛠️ Tech Stack

| Category      | Technology                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| **Frontend**  | [**React**](https://reactjs.org/), [**Vite**](https://vitejs.dev/), [**Material-UI**](https://mui.com/) |
| **Backend**   | [**Node.js**](https://nodejs.org/), [**Express.js**](https://expressjs.com/)                            |
| **Database**  | [**MongoDB**](https://www.mongodb.com/) with [**Mongoose**](https://mongoosejs.com/)                     |
| **Deployment**| [**Vercel**](https://vercel.com/)                                                                        |

---

## 📁 Project Structure

The project is structured to be Vercel-friendly, separating the backend API and the frontend client.

```
/
├── api/
│   ├── index.js        # Express server entry point for Vercel
│   └── ...             # Other backend files (routes, models, controllers)
├── client/
│   ├── src/            # React application source code
│   └── package.json    # Frontend dependencies
├── .gitignore
├── package.json        # Root package.json
├── README.md           # You are here!
└── vercel.json         # Vercel build & routing configuration
```

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- A [MongoDB](https://www.mongodb.com/try/download/community) instance (local or a cloud service like MongoDB Atlas)

### Local Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/mockT-app.git
    cd mockT-app
    ```

2.  **Install backend dependencies:**
    ```sh
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd client
    npm install
    cd ..
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. See the Environment Variables section for more details.

5.  **Run the development servers:**
    -   To run the backend server (typically on `http://localhost:5000`):
        ```sh
        npm run dev:server  # You need to add this script to your root package.json
        ```
    -   To run the frontend client (typically on `http://localhost:5173`):
        ```sh
        npm run dev:client  # You need to add this script to your root package.json
        ```

    > **Note:** Add the `dev:server` and `dev:client` scripts to your root `package.json` for convenience:
    > ```json
    > "scripts": {
    >   "dev:server": "nodemon api/index.js",
    >   "dev:client": "npm run dev --prefix client"
    > }
    > ```

---

## 🔑 Environment Variables

To run this project, you will need to set up environment variables for both the backend and the frontend.

### Backend (`/.env`)

Create a `.env` file in the project's root directory for the server:

```.env
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_super_secret_jwt_key"
```

### Frontend (`/client/.env`)

Create a `.env` file inside the `/client` directory for the React app. Vite requires variables to be prefixed with `VITE_`.

```.env
VITE_API_URL="http://localhost:5000/api"
```

---

## 🔗 API Endpoints

The backend API is served from the `/api` route. Here are some of the main endpoints:

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in a user and get a JWT token.
- `GET /api/tests` - Get a list of all available tests.
- `GET /api/tests/:id` - Get details for a single test.
- `POST /api/results` - Submit test results.

---

## 🚀 Deployment

This project is configured for easy deployment to **Vercel**.

1.  Push your code to a GitHub repository.
2.  Go to the Vercel Dashboard and import your project from GitHub.
3.  Add your `MONGO_URI` and `JWT_SECRET` as Environment Variables in the Vercel project settings.
4.  Click **Deploy**. Vercel will use the `vercel.json` file to build and deploy your frontend and backend automatically.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---