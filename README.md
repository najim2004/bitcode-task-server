# Server (Node.js + Express)

This project is a Node.js server built with Express. It provides an API for managing roadmap items and comments.

## Technologies Used

*   Node.js
*   Express
*   Mongoose
*   cors
*   cookie-parser
*   dotenv
*   bcrypt

## Project Structure

*   `index.js`: The main entry point for the server.
*   `controllers/`: Contains the route handlers.
    *   `authController.js`: Handles authentication-related requests.
    *   `roadmapController.js`: Handles roadmap item-related requests.
    *   `commentController.js`: Handles comment-related requests.
*   `middleware/`: Contains middleware functions.
    *   `auth.js`: Authentication middleware.
    *   `error.js`: Error handling middleware.
*   `models/`: Contains the Mongoose models.
    *   `User.js`: User model.
    *   `RoadmapItem.js`: Roadmap item model.
    *   `Comment.js`: Comment model.
*   `routes/`: Contains the API routes.
    *   `auth.js`: Authentication routes.
    *   `roadmap.js`: Roadmap item routes.
    *   `comments.js`: Comment routes.
*   `utils/`: Contains utility functions.
    *   `asyncHandler.js`: Utility for handling asynchronous functions.
*   `.env`: Environment variables.
*   `package.json`: Project dependencies and scripts.

## Getting Started

### Prerequisites

*   Node.js (>=18)
*   npm or yarn
*   MongoDB

### Installation

```bash
npm install
```

or

```bash
yarn install
```

### Configuration

Create a `.env` file in the `server/` directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/roadmapApp
JWT_SECRET=your_jwt_secret
```

Replace `your_jwt_secret` with a strong, random secret key.

### Development

To run the server in development mode:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the server with nodemon, which automatically restarts the server when changes are made to the code.

### API Endpoints

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Login an existing user.
*   `GET /api/roadmap`: Get all roadmap items.
*   `POST /api/roadmap`: Create a new roadmap item.
*   `GET /api/roadmap/:id`: Get a specific roadmap item.
*   `PUT /api/roadmap/:id`: Update a roadmap item.
*   `DELETE /api/roadmap/:id`: Delete a roadmap item.
*   `POST /api/comments`: Create a new comment.
*   `GET /api/comments/:roadmapId`: Get comments for a specific roadmap item.

## Middleware

*   `cors`: Enables Cross-Origin Resource Sharing.
*   `express.json()`: Parses JSON request bodies.
*   `cookieParser()`: Parses cookies.
*   `authMiddleware`: Authenticates users and protects routes.
*   `errorMiddleware`: Handles errors and sends appropriate responses.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.
